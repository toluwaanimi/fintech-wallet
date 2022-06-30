import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GetCurrentUser } from '../../common/decorators/get-user.decorator';
import { PaginateDto } from '../../common/dto/paginate.dto';
import { InternalTransferDTO } from '../../common/dto/transaction.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { HttpResponse } from '../../common/helpers/response-handler.helper';
import { User } from '../../models/user.entity';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('internal')
  @ApiOperation({ summary: 'Send money to maze user using username' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  async internalTransfer(
    @Body() body: InternalTransferDTO,
    @GetCurrentUser() user: User,
  ) {
    await this.transactionsService.transferByIdentifier(body, user);
    return HttpResponse.send('transfer processed successfully');
  }

  @Get('')
  @ApiOperation({ summary: 'Get all transactions' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  async getTransactions(
    @Query() query: PaginateDto,
    @GetCurrentUser() user: User,
  ) {
    const response = await this.transactionsService.getTransactions(
      query,
      user,
    );
    return HttpResponse.send('transactions retrieved', response);
  }
}
