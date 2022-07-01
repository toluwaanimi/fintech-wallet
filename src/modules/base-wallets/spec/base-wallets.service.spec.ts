import { Test, TestingModule } from '@nestjs/testing';
import { BaseWalletRepository } from '../../../common/tests/base-wallets/base-wallet.mock';
import { BaseWalletsService } from '../base-wallets.service';

describe('BaseWalletsService', () => {
  let service: BaseWalletsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseWalletsService,
        {
          provide: 'BaseWalletRepository',
          useValue: BaseWalletRepository,
        },
      ],
    }).compile();

    service = module.get<BaseWalletsService>(BaseWalletsService);
  });

  it('should get all base wallets available for users', async () => {
    const response = await service.getBaseWallets();
    expect(response.data).toBeDefined();
  });

  it('should get a single base wallet by currency', async () => {
    const response = await service.getSingleWallet({ currency: 'NGN' });
    expect(response.data).toBeDefined();
  });

  it('should get single base wallet by dynamic query', async () => {
    const response = await service.getSingleWalletQuery({ currency: 'NGN' });
    expect(response).toBeDefined();
  });
});
