import { Recipe } from '@/modules/recipe/entities/recipe.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class MealItemResponseDto {
  @ApiProperty({ example: '1' })
  @Expose()
  id: string;

  @ApiProperty({ example: ['bun', 'com'] })
  @Expose()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((recipe: Recipe) => recipe.name);
    }
    return [];
  })
  recipeNames: string[];
}
