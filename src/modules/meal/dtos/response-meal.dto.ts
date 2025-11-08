import { RecipeListItemResponseDto } from '@/modules/recipe/dtos/response-recipe-list-item.dto';
import { Recipe } from '@/modules/recipe/entities/recipe.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class MealResponseDto {
  @ApiProperty({ example: '1' })
  @Expose()
  id: string;

  @ApiProperty({ example: '2025-08-01' })
  @Expose()
  date: string;

  @ApiProperty({ example: 'lunch' })
  @Expose()
  type: string;

  @ApiProperty({ example: ['1', '2'] })
  @Expose()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((recipe: Recipe) => ({
        id: recipe.id,
        name: recipe.name,
      }));
    }
    return [];
  })
  recipes: RecipeListItemResponseDto[];
}
