import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class ForgotPasswordDto extends OmitType(CreateUserDto, [
  'name',
  'password',
] as const) {}
