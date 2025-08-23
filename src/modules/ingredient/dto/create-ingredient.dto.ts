import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

export class CreateIngredientDto {
  @ApiProperty({ example: 'Tomato', required: true })
  @IsDefined({ message: 'name is required' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
