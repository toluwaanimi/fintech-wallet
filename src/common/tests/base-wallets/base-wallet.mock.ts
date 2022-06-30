import { v4 as uuidv4 } from 'uuid';

export class BaseWalletRepository {
  save() {
    console.log('check me');
  }
}

export class BaseWalletsServiceMock {
  getBaseWallets = jest.fn(() => [
    {
      id: uuidv4(),
      symbol: '₦',
      currency: 'NGN',
      currency_flag: '🇳🇬',
      status: true,
      transfer: true,
      support_wallet: true,
    },
  ]);
}
