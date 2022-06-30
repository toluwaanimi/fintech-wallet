import { AbstractEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserWallets } from './wallet.entity';
import { UserTransactions } from './transaction.entity';

@Entity('base_wallets')
export class BaseWallet extends AbstractEntity {
  @Column({ nullable: false })
  currency: string;

  @Column({ nullable: true })
  symbol: string;

  @Column({ nullable: true })
  currency_flag: string;

  @Column({ default: true })
  status: boolean;

  @Column({ default: true })
  transfer: boolean;

  @Column({ default: true })
  can_transfer_to_user: boolean;

  @Column({ default: true })
  support_wallet: boolean;

  @OneToMany(() => UserWallets, (wallet) => wallet.base_wallet)
  wallet: UserWallets[];

  @OneToMany(() => UserTransactions, (transaction) => transaction.base_wallet)
  transaction: UserTransactions[];

  toJSON() {
    return {
      id: this.id,
      currency: this.currency,
      currency_flag: this.currency_flag,
      symbol: this.symbol,
      status: this.status,
      transfer: this.transfer,
      support_wallet: this.support_wallet,
    };
  }
}
