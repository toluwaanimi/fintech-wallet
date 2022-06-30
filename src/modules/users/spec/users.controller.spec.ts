import { Test, TestingModule } from '@nestjs/testing';
import {
  BaseWalletsServiceMock,
  BaseWalletRepository,
} from '../../../common/tests/base-wallets/base-wallet.mock';
import { UserRepositoryMock } from '../../../common/tests/users/user.mock';
import { BaseWalletsService } from '../../base-wallets/base-wallets.service';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

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
});
