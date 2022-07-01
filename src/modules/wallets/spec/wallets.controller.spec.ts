import { Test, TestingModule } from '@nestjs/testing';
import { demoUser } from '../../../common/tests/users/user.mock';
import { WalletRepository } from '../../../common/tests/wallets/wallet.mock';
import { WalletsController } from '../wallets.controller';
import { WalletsService } from '../wallets.service';

describe('WalletsController', () => {
  let controller: WalletsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletsController],
      providers: [
        WalletsService,
        {
          provide: 'UserWalletsRepository',
          useValue: WalletRepository,
        },
      ],
    }).compile();

    controller = module.get<WalletsController>(WalletsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get wallets', async () => {
    const response = await controller.getWallets(demoUser);
    expect(response.status).toBe(true);
    expect(response.data[0]['currency']).toBe('NGN');
  });

  it('should get single wallet', async () => {
    const response = await controller.getWallet('', demoUser);
    expect(response.status).toBe(true);
    expect(response.data['currency']).toBe('NGN');
  });
});
