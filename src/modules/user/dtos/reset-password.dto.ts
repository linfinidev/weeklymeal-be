import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto extends OmitType(CreateUserDto, [
  'name',
  'password',
] as const) {
  @ApiProperty({ required: true, example: '****' })
  @IsDefined({ message: 'password is required' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: true, example: '****' })
  @IsDefined({ message: 'token is required' })
  @IsString()
  @IsNotEmpty()
  token: string;
}
