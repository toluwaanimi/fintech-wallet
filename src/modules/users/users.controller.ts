import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { GetCurrentUser } from '../../common/decorators/get-user.decorator';
import {
  LoginDTO,
  RegisterDTO,
  UpdatePasswordDTO,
  SetTransactionPinDTO,
  UpdateTransactionPinDTO,
} from '../../common/dto/user.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { HttpResponse } from '../../common/helpers/response-handler.helper';
import { User } from '../../models/user.entity';
@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth/login')
  @ApiOperation({ summary: 'Login with email and password' })
  @HttpCode(200)
  async loginUser(@Body() body: LoginDTO) {
    const response = await this.usersService.login(body);
    return HttpResponse.send('login successful', response);
  }

  @Post('auth/register')
  @ApiOperation({ summary: 'Register user account' })
  @HttpCode(200)
  async registerUser(@Body() body: RegisterDTO) {
    try {
      await this.usersService.register(body);
      return HttpResponse.send('registration successful');
    } catch (error) {
      console.log(error);
    }
  }

  @Get('account')
  @ApiOperation({ summary: 'Get user profile' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  async getProfile(@GetCurrentUser() user: User) {
    const response = await this.usersService.getProfile(user);
    return HttpResponse.send('profile retrieved', response);
  }

  @Put('account/password')
  @ApiOperation({ summary: 'Update password ' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  async changePassword(
    @Body() body: UpdatePasswordDTO,
    @GetCurrentUser() user: User,
  ) {
    await this.usersService.changePassword(body, user);
    return HttpResponse.send('password reset successful');
  }

  @Post('account/pin')
  @ApiOperation({ summary: 'Set account transaction pin' })
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async setTransactionPin(
    @Body() body: SetTransactionPinDTO,
    @GetCurrentUser() user: User,
  ) {
    await this.usersService.setTransactionPin(body, user);
    return HttpResponse.send('transaction pin created');
  }

  @Put('account/pin')
  @ApiOperation({ summary: 'Update account transaction pin' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  async updateTransactionPin(
    @Body() body: UpdateTransactionPinDTO,
    @GetCurrentUser() user: User,
  ) {
    await this.usersService.updateTransactionPin(body, user);
    return HttpResponse.send('transaction pin updated');
  }
}
