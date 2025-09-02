import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RecipeListItemResponseDto {
  @ApiProperty({ example: '1' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Egg soup' })
  @Expose()
  name: string;
}
