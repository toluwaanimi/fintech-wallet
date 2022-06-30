import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import {
  BaseWalletsServiceMock,
  BaseWalletRepository,
} from '../../../common/tests/base-wallets/base-wallet.mock';
import { TransactionRepositoryMock } from '../../../common/tests/transactions/transaction.mock';
import {
  UserRepositoryMock,
  UserServiceMock,
} from '../../../common/tests/users/user.mock';
import {
  WalletRepository,
  WalletsServiceMock,
} from '../../../common/tests/wallets/wallet.mock';
import {
  RABBITMQ_NOTIFICATION,
  RABBITMQ_URL,
  RABBITMQ_QUEUE_NAME,
} from '../../../config/env.config';
import { BaseWalletsService } from '../../base-wallets/base-wallets.service';
import { UsersService } from '../../users/users.service';
import { WalletsService } from '../../wallets/wallets.service';
import { TransactionsService } from '../transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: RABBITMQ_NOTIFICATION,
            transport: Transport.RMQ,
            options: {
              urls: [RABBITMQ_URL],
              queue: RABBITMQ_QUEUE_NAME,
              queueOptions: {
                durable: false,
              },
              noAck: false,
            },
          },
        ]),
      ],
      providers: [
        TransactionsService,
        {
          provide: 'UserTransactionsRepository',
          useClass: TransactionRepositoryMock,
        },
        {
          provide: BaseWalletsService,
          useValue: BaseWalletsServiceMock,
        },
        {
          provide: 'BaseWalletRepository',
          useValue: BaseWalletRepository,
        },
        {
          provide: 'UserRepository',
          useClass: UserRepositoryMock,
        },
        {
          provide: UsersService,
          useClass: UserServiceMock,
        },
        {
          provide: 'WalletRepository',
          useValue: WalletRepository,
        },
        {
          provide: WalletsService,
          useClass: WalletsServiceMock,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
