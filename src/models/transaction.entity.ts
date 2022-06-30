import { AbstractEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { PaymentStatus } from '../common/enum/payment-status.enum';
import { BaseWallet } from './base-wallet.entity';
import {
  TransferMethodType,
  TransactionType,
} from '../common/enum/transaction-type.enum';

@Entity('user_transactions')
export class UserTransactions extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.transaction, {
    eager: true,
    nullable: true,
  })
  user: User;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true, type: 'decimal', precision: 20, scale: 4 })
  amount: number;

  @Column({ nullable: true })
  provider_reference: string;

  @Column({ nullable: true })
  reference: string;

  @Column({ nullable: true, default: TransferMethodType.internal })
  method: TransferMethodType;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  message: string;

  @Column({ default: PaymentStatus.pending })
  status: PaymentStatus;

  @Column({ nullable: false })
  tx_type: TransactionType;

  @ManyToOne(() => BaseWallet, (base_wallet) => base_wallet.transaction, {
    eager: true,
    nullable: true,
  })
  base_wallet: BaseWallet;

  @Column({ nullable: true })
  baseWalletId: string;

  @Column({ array: false, type: 'json', default: {} })
  metadata: any;

  toJSON() {
    return {
      id: this.id,
      amount: this.amount,
      description: this.description,
      reference: this.reference,
      currency: this.base_wallet.currency,
      currency_symbol: this.base_wallet.symbol,
      metadata: this.metadata,
      tx_type: this.tx_type,
      status: this.status,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
