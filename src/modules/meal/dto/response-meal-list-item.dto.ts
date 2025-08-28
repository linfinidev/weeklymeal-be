import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MealItemResponseDto } from './response-meal-item.dto';

export class MealListItemResponseDto {
  @ApiProperty({ example: '2025-08-01' })
  @Expose()
  date: string;

  @ApiProperty({ type: () => MealItemResponseDto, nullable: true })
  @Expose()
  lunch: MealItemResponseDto;

  @ApiProperty({ type: () => MealItemResponseDto, nullable: true })
  @Expose()
  dinner: MealItemResponseDto;
}
