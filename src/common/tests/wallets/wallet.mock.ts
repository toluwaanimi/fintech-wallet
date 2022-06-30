import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export class WalletRepository {
  save() {
    console.log('check me');
  }

  find = jest.fn(() => [
    {
      id: uuidv4(),
      balance: faker.random.numeric(),
      currency: 'NGN',
      transfer: true,
      symbol: '₦',
      flag: '🇳🇬',
      status: true,
      toJSON: function () {
        return {
          id: uuidv4(),
          balance: faker.random.numeric(),
          currency: 'NGN',
          transfer: true,
          symbol: '₦',
          flag: '',
          status: true,
        };
      },
    },
  ]);

  findOne = jest.fn(() => ({
    id: uuidv4(),
    balance: faker.random.numeric(),
    currency: 'NGN',
    transfer: true,
    symbol: '₦',
    flag: '🇳🇬',
    status: true,
    toJSON: function () {
      return {
        id: uuidv4(),
        balance: faker.random.numeric(),
        currency: 'NGN',
        transfer: true,
        symbol: '₦',
        flag: '',
        status: true,
      };
    },
  }));
}

export class WalletsServiceMock {
  getWallets = jest.fn(() => [
    {
      id: uuidv4(),
      balance: faker.random.numeric(),
      currency: 'NGN',
      transfer: true,
      symbol: '₦',
      flag: '🇳🇬',
      status: true,
      toJSON: function () {
        return {
          id: uuidv4(),
          balance: faker.random.numeric(),
          currency: 'NGN',
          transfer: true,
          symbol: '₦',
          flag: '',
          status: true,
        };
      },
    },
  ]);

  getWallet(id, user) {
    return jest.fn(() => ({
      id: uuidv4(),
      balance: faker.random.numeric(),
      currency: 'NGN',
      transfer: true,
      symbol: '₦',
      flag: '🇳🇬',
      status: true,
      toJSON: function () {
        return {
          id: uuidv4(),
          balance: faker.random.numeric(),
          currency: 'NGN',
          transfer: true,
          symbol: '₦',
          flag: '',
          status: true,
        };
      },
    }));
  }
}
