import { AbstractEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserWallets } from './wallet.entity';
import { UserTransactions } from './transaction.entity';

@Entity('users')
export class User extends AbstractEntity {
  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  username: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true, default: 'NG' })
  country: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  transaction_pin: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ array: false, type: 'json', default: {} })
  kyc: any;

  @OneToMany(() => UserWallets, (wallet) => wallet.user)
  wallet: UserWallets[];

  @OneToMany(() => UserTransactions, (transaction) => transaction.user)
  transaction: UserTransactions[];

  toJSON() {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone_number: this.phone_number,
      country: this.country,
      is_verified: this.is_verified,
      is_pin_set: !!this.transaction_pin,
      username: this.username,
    };
  }
}
