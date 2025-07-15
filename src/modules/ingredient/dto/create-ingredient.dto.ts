import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateIngredientDto {
  @ApiProperty({ example: 'Tomato' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
