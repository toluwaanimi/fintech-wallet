import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GetCurrentUser } from '../../common/decorators/get-user.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { HttpResponse } from '../../common/helpers/response-handler.helper';
import { User } from '../../models/user.entity';

import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user wallets' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getWallets(@GetCurrentUser() user: User) {
    const response = await this.walletsService.getWallets(user);
    return HttpResponse.send('wallets retrieved', response);
  }

  @Get(':walletId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user single wallet with wallet id' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getWallet(
    @Param('walletId') walletId: string,
    @GetCurrentUser() user: User,
  ) {
    const response = await this.walletsService.getWallet(walletId, user);
    return HttpResponse.send('wallet retrieved', response);
  }
}
