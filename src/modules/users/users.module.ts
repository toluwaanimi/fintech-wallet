import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseWalletsModule } from '../base-wallets/base-wallets.module';
import { User } from '../../models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BaseWalletsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
