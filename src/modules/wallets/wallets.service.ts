import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindCondition, Repository } from 'typeorm';
import { IServiceResponse } from '../../common/interfaces/service.interface';
import { IUser } from '../../common/interfaces/user.interface';
import { AppLogger } from '../../common/logger/logger';
import { User } from '../../models/user.entity';
import { UserWallets } from '../../models/wallet.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(UserWallets)
    private readonly walletRepository: Repository<UserWallets>,
  ) {}

  async getWallets(user: IUser): Promise<IServiceResponse> {
    const wallets = await this.walletRepository.find({
      where: {
        userId: user.id,
      },
    });
    return {
      data: wallets,
    };
  }

  async getWallet(walletId: string, user: IUser): Promise<IServiceResponse> {
    try {
      const wallet = await this.walletRepository.findOne({
        where: {
          userId: user.id,
          id: walletId,
        },
      });
      return {
        data: {
          ...wallet.toJSON(),
        },
      };
    } catch (e) {
      AppLogger.log(e);
      throw new BadRequestException('Could not retrieve wallet');
    }
  }

  async getSingleWalletQuery(
    query: FindCondition<UserWallets>,
  ): Promise<UserWallets> {
    const wallet = await this.walletRepository.findOne({
      where: query,
    });
    if (!wallet) {
      throw new BadRequestException('Could not retrieve wallet');
    }
    return wallet;
  }
}
