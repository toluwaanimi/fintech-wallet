import { Test, TestingModule } from '@nestjs/testing';
import { WalletRepository } from '../../../common/tests/wallets/wallet.mock';
import { WalletsService } from '../wallets.service';

describe('WalletsService', () => {
  let service: WalletsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletsService,
        {
          provide: 'UserWalletsRepository',
          useClass: WalletRepository,
        },
      ],
    }).compile();

    service = module.get<WalletsService>(WalletsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
