import { Module } from '@nestjs/common';

import { BaseWalletsModule } from './base-wallets/base-wallets.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [UsersModule, WalletsModule, TransactionsModule, BaseWalletsModule],
  controllers: [],
  providers: [],
})
export class V1Module {}
