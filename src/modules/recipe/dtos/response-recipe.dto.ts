import { Ingredient } from '@/modules/ingredient/entities/ingredient.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

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
  img_url: string;

  @ApiProperty({ example: ['1', '2'] })
  @Expose()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((ingredient: Ingredient) => ingredient.id);
    }
    return [];
  })
  ingredientIds: string[];
}
