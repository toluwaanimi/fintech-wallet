import { Test, TestingModule } from '@nestjs/testing';
import {
  BaseWalletRepository,
  BaseWalletsServiceMock,
} from '../../../common/tests/base-wallets/base-wallet.mock';
import { UserRepositoryMock } from '../../../common/tests/users/user.mock';
import { BaseWalletsService } from '../../base-wallets/base-wallets.service';
import { UsersService } from '../users.service';
import { faker } from '@faker-js/faker';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'UserRepository',
          useClass: UserRepositoryMock,
        },
        {
          provide: BaseWalletsService,
          useValue: BaseWalletsServiceMock,
        },
        {
          provide: 'BaseWalletRepository',
          useValue: BaseWalletRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login a user', async () => {
    const response = await service.login({
      email: 'a@a.com',
      password: 'password',
    });
    expect(response.data).toBeDefined();
  });

  // it('should register a user', async () => {
  //   const email = faker.internet.email();
  //   const firstName = faker.name.firstName();
  //   const lastName = faker.name.lastName();
  //   const username = faker.random.word();
  //   const phoneNumber = '+23481' + faker.random.numeric(8);
  //   const response = await service.register({
  //     first_name: firstName,
  //     last_name: lastName,
  //     username: username,
  //     country: 'Nigeria',
  //     email: email,
  //     phone_number: phoneNumber,
  //     password: 'password',
  //   });
  //   expect(response.data).toBeDefined();
  // });
});
