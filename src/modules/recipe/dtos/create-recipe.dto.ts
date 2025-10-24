import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDefined,
  IsOptional,
} from 'class-validator';
import { CreateRecipeIngredientDto } from './create-recipe-ingredient.dto';

export class CreateRecipeDto {
  @ApiProperty({ required: true, example: 'Egg soup' })
  @IsDefined({ message: 'name is required' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, example: 'Crack 2 eggs,...' })
  @IsString()
  @IsNotEmpty()
  instructions: string;

  @ApiProperty({ required: true, nullable: true, example: 'imgSrc' })
  @IsOptional()
  imgUrl: string;

  @ApiProperty({
    required: true,
    type: [CreateRecipeIngredientDto],
    example: [{ id: '1', unit: '1 tea spoon' }],
  })
  @IsArray()
  @IsNotEmpty()
  recipeIngredients: CreateRecipeIngredientDto[];
}
