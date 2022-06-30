import { Controller } from '@nestjs/common';
import { BaseWalletsService } from './base-wallets.service';

@Controller('base-wallets')
export class BaseWalletsController {
  constructor(private readonly baseWalletsService: BaseWalletsService) {}
}
