import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class InternalTransferDTO {
  @IsNotEmpty()
  @ApiProperty()
  pin: string;

  @IsNotEmpty()
  @ApiProperty()
  identifier: string;

  @IsNotEmpty()
  @ApiProperty()
  currency: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  amount: number;

  @IsOptional()
  @ApiPropertyOptional()
  description: string;
}
