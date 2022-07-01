import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export const WalletRepository = {
  find: jest.fn(() => [
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
  ]),

  findOne: jest.fn(() => ({
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
  })),
};

export const WalletsServiceMock = {
  getWallets: jest.fn((user) => [
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
  ]),

  getWallet: jest.fn((id, user) => ({
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
  })),

  getSingleWalletQuery: jest.fn((query) => ({
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
  })),
};
