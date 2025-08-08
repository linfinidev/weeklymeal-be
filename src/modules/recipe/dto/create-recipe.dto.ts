import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsUUID } from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty({ example: 'Tomato' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Crack 2 eggs,...' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  img_url: string;

  @ApiProperty({ type: [String], example: ['uuid-1', 'uuid-2'] })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  ingredientIds: string[];
}
