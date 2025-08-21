import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class IngredientResponseDto {
  @ApiProperty({ example: '1' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Tomato' })
  @Expose()
  name: string;

  @ApiProperty({ example: '2025/08/01' })
  @Expose()
  createdAt: string;

  @ApiProperty({ example: '2025/08/01' })
  @Expose()
  updatedAt: string;
}
