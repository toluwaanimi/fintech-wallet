import { Test, TestingModule } from '@nestjs/testing';
import {
  BaseWalletsServiceMock,
  BaseWalletRepository,
} from '../../../common/tests/base-wallets/base-wallet.mock';
import {
  demoUser,
  UserRepositoryMock,
} from '../../../common/tests/users/user.mock';
import { BaseWalletsService } from '../../base-wallets/base-wallets.service';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { faker } from '@faker-js/faker';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
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

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be log user in with email and password', async () => {
    const response = await controller.loginUser({
      email: demoUser.email,
      password: 'password',
    });
    expect(response.data['first_name']).toBe(demoUser.first_name);
    expect(response.data['email']).toBe(demoUser.email);
  });

  it('should get active account by authorization', async () => {
    const response = await controller.getProfile(demoUser);
    expect(response.data['first_name']).toBe(demoUser.first_name);
    expect(response.data['email']).toBe(demoUser.email);
  });

  it('should change password', async () => {
    const response = await controller.changePassword(
      { old_password: 'password', password: 'password' },
      demoUser,
    );
    expect(response).toBeDefined();
  });

  it('should change pin', async () => {
    const response = await controller.updateTransactionPin(
      { old_pin: '123456', pin: '123456' },
      demoUser,
    );
    expect(response).toBeDefined();
  });
});
