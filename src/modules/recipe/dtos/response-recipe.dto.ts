import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { RecipeIngredientResponseDto } from './response-recipe-ingredient.dto';
import { RecipeIngredient } from '../entities/recipe-ingredient.entity';

export class RecipeResponseDto {
  @ApiProperty({ example: '1' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Egg soup' })
  @Expose()
  name: string;

  @ApiProperty({ example: '- Dice tomato\n- Crack 2 eggs' })
  @Expose()
  intructions: string;

  @ApiProperty({ example: '/imgSrc' })
  @Expose()
  imgUrl: string;

  @ApiProperty({ example: [{ unit: '1 qua', id: '1' }] })
  @Expose()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((ingredient: RecipeIngredient) => ({
        ingredientId: ingredient.id,
        unit: ingredient.unit,
      }));
    }
    return [];
  })
  ingredients: RecipeIngredientResponseDto[];
}
