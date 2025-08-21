import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RecipeResponseDto {
  @ApiProperty({ example: '1' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Egg soup' })
  @Expose()
  name: string;

  @ApiProperty({ example: '- Dice tomato\n- Crack 2 eggs' })
  @Expose()
  content: string;

  @ApiProperty({ example: '/imgSrc' })
  @Expose()
  img_url: string;

  @ApiProperty({ example: ['1', '2'] })
  @Expose()
  ingredientIds: string[];

  @ApiProperty({ example: '2025/08/01' })
  @Expose()
  createdAt: string;

  @ApiProperty({ example: '2025/08/01' })
  @Expose()
  updatedAt: string;
}
