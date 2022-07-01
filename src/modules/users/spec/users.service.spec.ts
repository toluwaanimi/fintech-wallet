import { Test, TestingModule } from '@nestjs/testing';
import { getConnection } from 'typeorm';
import {
  BaseWalletRepository,
  BaseWalletsServiceMock,
} from '../../../common/tests/base-wallets/base-wallet.mock';
import {
  demoUser,
  UserRepositoryMock,
} from '../../../common/tests/users/user.mock';
import { BaseWalletsService } from '../../base-wallets/base-wallets.service';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'UserRepository',
          useClass: UserRepositoryMock,
        },
        {
          provide: BaseWalletsService,
          useValue: BaseWalletsServiceMock,
        },
        {
          provide: 'BaseWalletRepository',
          useValue: BaseWalletRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login a user', async () => {
    const response = await service.login({
      email: demoUser.email,
      password: 'password',
    });
    expect(response.data['first_name']).toBe(demoUser.first_name);
    expect(response.data['email']).toBe(demoUser.email);
  });

  it('should get active user', async () => {
    const response = await service.getProfile(demoUser);
    expect(response.data['first_name']).toBe(demoUser.first_name);
    expect(response.data['email']).toBe(demoUser.email);
  });

  it('should change password', async () => {
    const response = await service.changePassword(
      { old_password: 'password', password: 'password' },
      demoUser,
    );
    expect(response).toBeUndefined();
  });

  it('should update transaction pin', async () => {
    const response = await service.updateTransactionPin(
      { pin: '123456', old_pin: '123456' },
      demoUser,
    );
    expect(response).toBeUndefined();
  });

  it('should search user', async () => {
    const response = await service.searchUserByIdentifier('nj');
    expect(response.data).toBeDefined();
  });
});
