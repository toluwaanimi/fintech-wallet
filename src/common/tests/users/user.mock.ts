import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../interfaces/user.interface';

export const demoUser: IUser = {
  id: uuidv4(),
  password: '$2a$12$pEZscbgT4vV0Q2Qgz8SDae1REB3cH5B0Fam2IPJuBUoBLdpsXEMeO',
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  phone_number: '+23481' + faker.random.numeric(8),
  country: 'Nigeria',
  is_verified: true,
  transaction_pin:
    '$2a$12$KyWP4oXixatl0AgehacBSObl4lgL0afGKtd1F8Lyd9r5NAA0tNiLi',
  username: faker.random.word(),
};
export class UserRepositoryMock {
  findOne = jest.fn(() => ({
    id: demoUser.id,
    password: '$2a$12$pEZscbgT4vV0Q2Qgz8SDae1REB3cH5B0Fam2IPJuBUoBLdpsXEMeO',
    first_name: demoUser.first_name,
    last_name: demoUser.last_name,
    email: demoUser.email,
    phone_number: demoUser.phone_number,
    country: 'Nigeria',
    is_verified: true,
    transaction_pin:
      '$2a$12$KyWP4oXixatl0AgehacBSObl4lgL0afGKtd1F8Lyd9r5NAA0tNiLi',
    username: demoUser.username,
    toJSON: function () {
      return {
        id: demoUser.id,
        first_name: demoUser.first_name,
        last_name: demoUser.last_name,
        email: demoUser.email,
        phone_number: demoUser.phone_number,
        country: 'Nigeria',
        is_verified: true,
        is_pin_set: true,
        username: demoUser.username,
      };
    },
  }));

  update = jest.fn(({}, {}) => ({
    id: uuidv4(),
    password: '$2a$12$pEZscbgT4vV0Q2Qgz8SDae1REB3cH5B0Fam2IPJuBUoBLdpsXEMeO',
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    phone_number: '+23481' + faker.random.numeric(8),
    country: 'Nigeria',
    is_verified: true,
    is_pin_set: true,
    transaction_pin:
      '$2a$12$KyWP4oXixatl0AgehacBSObl4lgL0afGKtd1F8Lyd9r5NAA0tNiLi',
    username: faker.random.word(),
  }));
}

export class UserServiceMock {
  save() {
    console.log('check me');
  }
}
