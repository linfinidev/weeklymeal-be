import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsUUID,
  IsDefined,
  IsOptional,
} from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty({ required: true, example: 'Egg soup' })
  @IsDefined({ message: 'name is required' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, example: 'Crack 2 eggs,...' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ required: true, nullable: true, example: 'imgSrc' })
  @IsString()
  @IsOptional()
  img_url: string;

  @ApiProperty({
    required: true,
    type: [String],
    example: ['uuid-1', 'uuid-2'],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  ingredientIds: string[];
}
