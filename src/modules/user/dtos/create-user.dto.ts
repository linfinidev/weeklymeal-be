import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDefined, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true, example: 'John Doe' })
  @IsDefined({ message: 'name is required' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, example: 'john_doe@example.com' })
  @IsDefined({ message: 'id is required' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ required: true, example: '****' })
  @IsDefined({ message: 'password is required' })
  @IsString()
  @IsOptional()
  password: string;
}
