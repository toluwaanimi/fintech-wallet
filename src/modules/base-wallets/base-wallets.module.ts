import { Module } from '@nestjs/common';
import { BaseWalletsService } from './base-wallets.service';
import { BaseWalletsController } from './base-wallets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseWallet } from '../../models/base-wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BaseWallet])],
  controllers: [BaseWalletsController],
  providers: [BaseWalletsService],
  exports: [BaseWalletsService],
})
export class BaseWalletsModule {}
