import { AbstractEntity } from './base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { BaseWallet } from './base-wallet.entity';

@Entity('user_wallets')
export class UserWallets extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.wallet, { nullable: true })
  user: User;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => BaseWallet, (base_wallet) => base_wallet.wallet, {
    eager: true,
    nullable: true,
  })
  base_wallet: BaseWallet;

  @Column({ nullable: true })
  baseWalletId: string;

  @Column({
    default: 0,
    type: 'decimal',
    precision: 20,
    scale: 8,
  })
  balance: number;

  toJSON() {
    return {
      id: this.id,
      balance: Number(this.balance).toFixed(2),
      currency: this.base_wallet.currency,
      transfer: this.base_wallet.transfer,
      symbol: this.base_wallet.symbol,
      flag: this.base_wallet.currency_flag,
      status: this.base_wallet.status,
    };
  }
}
