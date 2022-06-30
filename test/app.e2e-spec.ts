import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from './test.module';
import { getConnection, getRepository } from 'typeorm';
import { BaseWallet } from '../src/models/base-wallet.entity';
import { faker } from '@faker-js/faker';

describe('LazerPay (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await getRepository(BaseWallet).save({
      symbol: '₦',
      currency: 'NGN',
      currency_flag: '🇳🇬',
    });
  });

  afterAll(async () => {
    await getConnection().synchronize(true);
    await app.close();
  });
  let token = '';

  describe('Endpoints', () => {
    const email = faker.internet.email();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const password = 'password';
    const phoneNumber = '+23481' + faker.random.numeric(8);
    const country = 'Nigeria';
    const username = faker.random.word();
    const pin = faker.random.numeric(6);

    const emailSecond = faker.internet.email();
    const firstNameSecond = faker.name.firstName();
    const lastNameSecond = faker.name.lastName();
    const passwordSecond = 'password';
    const phoneNumberSecond = '+23481' + faker.random.numeric(8);
    const countrySecond = 'Nigeria';
    const usernameSecond = faker.random.word();

    it('/auth/register (POST)', async () => {
      return await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: email,
          first_name: firstName,
          last_name: lastName,
          password: password,
          country: country,
          phone_number: phoneNumber,
          username: username,
        })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.status).toBe(true);
        });
    });

    it('/auth/register Second User (POST)', async () => {
      return await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: emailSecond,
          first_name: firstNameSecond,
          last_name: lastNameSecond,
          password: passwordSecond,
          country: countrySecond,
          phone_number: phoneNumberSecond,
          username: usernameSecond,
        })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.status).toBe(true);
        });
    });

    it('/auth/login (POST)', async () => {
      return await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: email,
          password: password,
        })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.status).toBe(true);
          token = res.body.data.token;
        });
    });

    it('/account (GET)', async () => {
      return await request(app.getHttpServer())
        .get('/account')
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.status).toBe(true);
        });
    });

    it('/account/pin (POST)', async () => {
      return await request(app.getHttpServer())
        .post('/account/pin')
        .send({
          pin: pin,
        })
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.status).toBe(true);
        });
    });

    it('/account/pin (PUT)', async () => {
      return await request(app.getHttpServer())
        .put('/account/pin')
        .send({
          pin: pin,
          old_pin: pin,
        })
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.status).toBe(true);
        });
    });

    it('/account/password (PUT)', async () => {
      return await request(app.getHttpServer())
        .put('/account/password')
        .send({
          password: password,
          old_password: password,
        })
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.status).toBe(true);
        });
    });

    it('/wallets (GET)', async () => {
      return await request(app.getHttpServer())
        .get('/wallets')
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.status).toBe(true);
        });
    });

    it('/transactions (POST)', async () => {
      return await request(app.getHttpServer())
        .post('/transactions/internal')
        .send({
          pin: pin,
          identifier: usernameSecond,
          currency: 'NGN',
          amount: 100,
          description: 'Lazerpay transfer',
        })
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.status).toBe(true);
        });
    });

    it('/transactions (GET)', async () => {
      return await request(app.getHttpServer())
        .get('/transactions')
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.status).toBe(true);
        });
    });
  });
});
