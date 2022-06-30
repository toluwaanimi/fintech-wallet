import { Test, TestingModule } from '@nestjs/testing';
import { BaseWalletRepository } from '../../../common/tests/base-wallets/base-wallet.mock';
import { BaseWalletsController } from '../base-wallets.controller';
import { BaseWalletsService } from '../base-wallets.service';

describe('BaseWalletsController', () => {
  let controller: BaseWalletsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseWalletsController],
      providers: [
        BaseWalletsService,
        {
          provide: 'BaseWalletRepository',
          useValue: BaseWalletRepository,
        },
      ],
    }).compile();

    controller = module.get<BaseWalletsController>(BaseWalletsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
