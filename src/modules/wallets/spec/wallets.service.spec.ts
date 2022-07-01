import { Test, TestingModule } from '@nestjs/testing';
import { demoUser } from '../../../common/tests/users/user.mock';
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
          useValue: WalletRepository,
        },
      ],
    }).compile();

    service = module.get<WalletsService>(WalletsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get user wallet', async () => {
    const response = await service.getWallets(demoUser);
    expect(response.data[0]['transfer']).toBe(true);
    expect(response.data[0]['currency']).toBe('NGN');
    expect(response.data[0]['status']).toBe(true);
  });

  it('should get user single wallet', async () => {
    const response = await service.getWallet('', demoUser);
    expect(response.data['transfer']).toBe(true);
    expect(response.data['currency']).toBe('NGN');
    expect(response.data['status']).toBe(true);
  });

  it('should get getSingleWalletQuery', async () => {
    const response = await service.getSingleWalletQuery({});
    expect(response['transfer']).toBe(true);
    expect(response['currency']).toBe('NGN');
    expect(response['status']).toBe(true);
  });
});
