import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaginateDto {
  @IsNotEmpty()
  @ApiProperty()
  per_page: number;
}
