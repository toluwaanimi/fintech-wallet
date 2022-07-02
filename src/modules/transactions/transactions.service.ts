import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { getConnection, getRepository, Repository } from 'typeorm';
import { BaseWalletsService } from '../base-wallets/base-wallets.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

import { paginate } from 'nestjs-typeorm-paginate';
import { WalletsService } from '../wallets/wallets.service';

import { ClientProxy } from '@nestjs/microservices';
import { PaginateDto } from '../../common/dto/paginate.dto';
import { InternalTransferDTO } from '../../common/dto/transaction.dto';
import { PaymentStatus } from '../../common/enum/payment-status.enum';
import {
  TransactionType,
  TransferMethodType,
} from '../../common/enum/transaction-type.enum';
import { Helper } from '../../common/helpers/helper';
import { IPaginate } from '../../common/interfaces/paginate.interface';
import { IServiceResponse } from '../../common/interfaces/service.interface';
import { AppLogger } from '../../common/logger/logger';
import { RABBITMQ_NOTIFICATION } from '../../config/env.config';
import { UserTransactions } from '../../models/transaction.entity';
import { User } from '../../models/user.entity';
import { UserWallets } from '../../models/wallet.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(UserTransactions)
    private readonly userTransactionRepository: Repository<UserTransactions>,
    private baseWalletService: BaseWalletsService,
    private userService: UsersService,
    private walletService: WalletsService,
    @Inject(RABBITMQ_NOTIFICATION)
    private readonly clientNotification: ClientProxy,
  ) {}

  async getTransactions(
    payload: PaginateDto,
    user: User,
  ): Promise<{ data: UserTransactions[]; meta: IPaginate }> {
    const transactions = await paginate(
      this.userTransactionRepository,
      {
        page: 1,
        limit: payload.per_page || 25,
      },
      {
        where: {
          userId: user.id,
        },
        order: {
          created_at: 'DESC',
        },
      },
    );
    return {
      data: transactions.items,
      meta: transactions.meta,
    };
  }

  async transferByIdentifier(
    data: InternalTransferDTO,
    user: User,
  ): Promise<IServiceResponse> {
    const currency = await this.baseWalletService.getSingleWalletQuery({
      currency: data.currency,
    });

    if (!bcrypt.compareSync(data.pin, user.transaction_pin)) {
      throw new BadRequestException('Invalid transaction pin');
    }

    if (user.username.toLowerCase() === data.identifier.toLowerCase()) {
      throw new BadRequestException('Cannot send money to yourself');
    }
    // You can implement a transfer limit handler based on KYC in future

    const receiver = (
      await this.userService.searchUserByIdentifier(data.identifier)
    ).data;

    if (!receiver) {
      throw new BadRequestException('Invalid receipt username');
    }
    const senderWallet = await this.walletService.getSingleWalletQuery({
      userId: user.id,
      baseWalletId: currency.id,
    });

    const receiverWallet = await this.walletService.getSingleWalletQuery({
      userId: receiver.id,
      baseWalletId: currency.id,
    });
    if (!receiverWallet) {
      throw new BadRequestException('Cannot find receipt wallet');
    }

    if (senderWallet.balance < data.amount) {
      throw new BadRequestException('Insufficient balance');
    }

    const userBalanceCalulator = await Helper.calculateDebitBalanceAfter(
      senderWallet.balance,
      data.amount,
    );

    const receiverBalanceCalulator = await Helper.calculateCreditBalanceAfter(
      receiverWallet.balance,
      data.amount,
    );

    const batchReference = Helper.generateReference('TRF_');

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.decrement(
        UserWallets,
        {
          baseWalletId: senderWallet.baseWalletId,
          userId: user.id,
          id: senderWallet.id,
        },
        'balance',
        data.amount,
      );

      await queryRunner.manager.increment(
        UserWallets,
        {
          baseWalletId: receiverWallet.baseWalletId,
          userId: receiver.id,
          id: receiverWallet.id,
        },
        'balance',
        data.amount,
      );
      await queryRunner.manager.insert(UserTransactions, [
        {
          userId: user.id,
          tx_type: TransactionType.debit,
          status: PaymentStatus.success,
          balance_before: userBalanceCalulator.balance_before,
          balance_after: userBalanceCalulator.balance_after,
          amount: data.amount,
          description: `You sent ${receiver.first_name} with ${
            currency.symbol
          }${data.amount / 100} 💸`,
          baseWalletId: currency.id,
          message: data.description,
          method: TransferMethodType.internal,
          reference: batchReference,
        },
        {
          userId: receiver.id,
          tx_type: TransactionType.credit,
          status: PaymentStatus.success,
          amount: data.amount,
          balance_before: receiverBalanceCalulator.balance_before,
          balance_after: receiverBalanceCalulator.balance_after,
          description: `You received ${currency.symbol}${
            data.amount / 100
          } from ${user.first_name} 💸`,
          message: data.description,
          baseWalletId: currency.id,
          method: TransferMethodType.internal,
          reference: batchReference,
        },
      ]);
      await queryRunner.commitTransaction();
      this.clientNotification.emit('send_email_transfer_out', {
        sender_email: user.email,
        sender_name: user.first_name,
        amount: data.amount / 100,
      });

      this.clientNotification.emit('send_email_transfer_in', {
        to_email: receiver.email,
        receiver_name: receiver.first_name,
        amount: data.amount / 100,
      });
      return;
    } catch (e) {
      AppLogger.log(e);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException("We couldn't make the transfer");
    } finally {
      await queryRunner.release();
    }
  }
}
