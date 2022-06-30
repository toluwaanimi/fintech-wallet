import { Test, TestingModule } from '@nestjs/testing';
import { BaseWalletsService } from '../base-wallets.service';

const BaseWalletRepository = {
  save() {
    console.log('check me');
  },
};

const BaseWalletsServiceMock = {
  save() {
    console.log('check me');
  },
};

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
