import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { getConnection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { BaseWalletsService } from '../base-wallets/base-wallets.service';
import { CountryCode } from 'libphonenumber-js/types';
import { CountryHelper } from '../../common/helpers/country.helper';
import { JwtHelper } from '../../common/helpers/jwt.helper';
import { IServiceResponse } from '../../common/interfaces/service.interface';
import { User } from '../../models/user.entity';
import { UserWallets } from '../../models/wallet.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private baseWalletService: BaseWalletsService,
  ) {}

  async login(payload: {
    email: string;
    password: string;
  }): Promise<IServiceResponse> {
    payload.email = payload.email.toLowerCase();
    const user = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
    });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    // if (!bcrypt.compareSync(payload.password, user.password)) {
    //   throw new BadRequestException('Invalid credentials');
    // }

    const jwt = await JwtHelper.signToken(user);
    return {
      data: {
        ...user.toJSON(),
        token: jwt,
      },
    };
  }

  async register(payload): Promise<IServiceResponse> {
    payload.email = payload.email.toLowerCase();
    payload.username = payload.username.toLowerCase();
    payload.phone_number = payload.phone_number.replace('+', '');

    const country = CountryHelper.getCountry(payload.country);
    if (!country) {
      throw new BadRequestException('Invalid country');
    }
    if (
      !isValidPhoneNumber(payload.phone_number, country.iso2 as CountryCode)
    ) {
      throw new BadRequestException('Invalid phone number for the country');
    }

    const baseWallets = (await this.baseWalletService.getBaseWallets()).data;
    if (baseWallets.length === 0) {
      throw new BadRequestException(
        'We cannot create account for you at the moment, kindly contact support',
      );
    }

    const foundUser = await this.userRepository.findOne({
      where: [
        { email: payload.email },
        { phone_number: payload.phone_number },
        { username: payload.username },
      ],
    });
    if (foundUser) {
      if (foundUser.phone_number === payload.phone_number) {
        throw new BadRequestException('Phone number already exist');
      }

      if (foundUser.email === payload.email) {
        throw new BadRequestException('Email already exist');
      }

      if (foundUser.username === payload.username) {
        throw new BadRequestException('Username already exist');
      }
    }

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.save(User, {
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        password: bcrypt.hashSync(payload.password, 8),
        phone_number: payload.phone_number,
        username: payload.username,
        country: payload.country,
      });
      const wallets = baseWallets.map((currency) => {
        return {
          baseWalletId: currency.id,
          userId: user.id,
          balance: 100000,
        };
      });

      await queryRunner.manager.insert(UserWallets, wallets);
      await queryRunner.commitTransaction();
      const account = await this.userRepository.findOne({
        where: {
          id: user.id,
        },
      });
      const jwt = await JwtHelper.signToken(account);
      return {
        data: {
          ...account.toJSON(),
          token: jwt,
        },
      };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(
        'Something went wrong, kindly contact support',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async getProfile(user: User): Promise<IServiceResponse> {
    const account = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
    });
    if (!account) {
      throw new BadRequestException('Invalid account');
    }
    return {
      data: account.toJSON(),
    };
  }

  async changePassword(
    payload: { old_password: any; password: any },
    user: User,
  ): Promise<IServiceResponse> {
    if (!bcrypt.compareSync(payload.old_password, user.password)) {
      throw new BadRequestException('Invalid old password');
    }
    await this.userRepository.update(
      {
        id: user.id,
      },
      {
        password: bcrypt.hashSync(payload.password, 8),
      },
    );
    return;
  }

  async setTransactionPin(
    payload: { pin: any },
    user: User,
  ): Promise<IServiceResponse> {
    if (!!user.transaction_pin) {
      throw new BadRequestException('already created transaction pin');
    }

    await this.userRepository.update(
      {
        id: user.id,
      },
      {
        transaction_pin: bcrypt.hashSync(payload.pin, 8),
      },
    );
    return;
  }

  async updateTransactionPin(
    payload: { old_pin: any; pin: any },
    user: User,
  ): Promise<IServiceResponse> {
    if (!bcrypt.compareSync(payload.old_pin, user.transaction_pin)) {
      throw new BadRequestException('Wrong old pin');
    }

    await this.userRepository.update(
      {
        id: user.id,
      },
      {
        transaction_pin: bcrypt.hashSync(payload.pin, 8),
      },
    );
    return;
  }

  async searchUserByIdentifier(identifier: string): Promise<{ data: User }> {
    const foundUser = await this.userRepository.findOne({
      where: [{ phone_number: identifier }, { username: identifier }],
    });
    if (!foundUser) {
      throw new BadRequestException('Invalid user');
    }
    return {
      data: foundUser,
    };
  }
}
