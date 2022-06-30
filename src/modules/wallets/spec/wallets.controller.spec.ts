import { Test, TestingModule } from '@nestjs/testing';
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
          useClass: WalletRepository,
        },
      ],
    }).compile();

    controller = module.get<WalletsController>(WalletsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
