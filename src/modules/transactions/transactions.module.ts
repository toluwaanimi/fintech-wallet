import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseWalletsModule } from '../base-wallets/base-wallets.module';
import { UsersModule } from '../users/users.module';
import { WalletsModule } from '../wallets/wallets.module';

import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  RABBITMQ_NOTIFICATION,
  RABBITMQ_URL,
  RABBITMQ_QUEUE_NAME,
} from '../../config/env.config';
import { UserTransactions } from '../../models/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTransactions]),
    BaseWalletsModule,
    UsersModule,
    WalletsModule,
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
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
