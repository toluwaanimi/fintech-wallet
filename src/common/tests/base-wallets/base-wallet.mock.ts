import { v4 as uuidv4 } from 'uuid';

export const BaseWalletRepository = {
  find: jest.fn(({}) => [
    {
      id: uuidv4(),
      symbol: '₦',
      currency: 'NGN',
      currency_flag: '🇳🇬',
      status: true,
      transfer: true,
      support_wallet: true,
    },
  ]),

  findOne: jest.fn(({}) => ({
    id: uuidv4(),
    symbol: '₦',
    currency: 'NGN',
    currency_flag: '🇳🇬',
    status: true,
    transfer: true,
    support_wallet: true,
  })),
};

export const BaseWalletsServiceMock = {
  getBaseWallets: jest.fn(() => ({
    data: [
      {
        id: uuidv4(),
        symbol: '₦',
        currency: 'NGN',
        currency_flag: '🇳🇬',
        status: true,
        transfer: true,
        support_wallet: true,
      },
    ],
  })),

  getSingleWallet: jest.fn((query) => ({
    data: {
      id: uuidv4(),
      symbol: '₦',
      currency: 'NGN',
      currency_flag: '🇳🇬',
      status: true,
      transfer: true,
      support_wallet: true,
    },
  })),

  getSingleWalletQuery: jest.fn((query) => ({
    data: {
      id: uuidv4(),
      symbol: '₦',
      currency: 'NGN',
      currency_flag: '🇳🇬',
      status: true,
      transfer: true,
      support_wallet: true,
    },
  })),
};
