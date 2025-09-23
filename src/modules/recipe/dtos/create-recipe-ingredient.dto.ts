import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateRecipeIngredientDto {
  @ApiProperty({ required: true, nullable: true, example: 'Flour' })
  @IsOptional()
  unit: string;

  @ApiProperty({ required: true, example: 'Crack 2 eggs,...' })
  @IsString()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  ingredientId: string;
}
