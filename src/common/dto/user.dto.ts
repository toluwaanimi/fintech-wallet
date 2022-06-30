import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  first_name: string;

  @IsNotEmpty()
  @ApiProperty()
  last_name: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  country: string;

  @IsNotEmpty()
  @ApiProperty()
  phone_number: string;

  @IsNotEmpty()
  @ApiProperty()
  username: string;
}

export class LoginDTO {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class UpdateTransactionPinDTO {
  @IsNotEmpty()
  @Length(6, 6)
  @ApiProperty()
  pin: string;

  @IsNotEmpty()
  @Length(6, 6)
  @ApiProperty()
  old_pin: string;
}

export class UpdatePasswordDTO {
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  old_password: string;
}

export class SetTransactionPinDTO {
  @IsNotEmpty()
  @ApiProperty()
  @Length(6, 6)
  pin: string;
}
