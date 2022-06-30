import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindCondition, Repository } from 'typeorm';
import { IServiceResponse } from '../../common/interfaces/service.interface';
import { BaseWallet } from '../../models/base-wallet.entity';

@Injectable()
export class BaseWalletsService {
  constructor(
    @InjectRepository(BaseWallet)
    private readonly baseWalletRepository: Repository<BaseWallet>,
  ) {}

  async getBaseWallets(): Promise<IServiceResponse> {
    const wallets = await this.baseWalletRepository.find({});
    return {
      data: wallets,
    };
  }

  async getSingleWallet(payload: {
    currency: string;
  }): Promise<IServiceResponse> {
    const wallet = await this.baseWalletRepository.findOne({
      where: {
        currency: payload.currency.toUpperCase(),
      },
    });
    if (!wallet) {
      throw new NotFoundException('Invalid wallet');
    }
    return {
      data: wallet,
    };
  }

  async getSingleWalletQuery(
    query: FindCondition<BaseWallet>,
  ): Promise<BaseWallet> {
    const wallet = await this.baseWalletRepository.findOne({
      where: query,
    });
    if (!wallet) {
      throw new NotFoundException('Invalid wallet');
    }
    return wallet;
  }
}
