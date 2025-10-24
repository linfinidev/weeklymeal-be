import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateRecipeIngredientDto {
  @ApiProperty({ required: true, nullable: true, example: '1 gram' })
  @IsOptional()
  unit: string;

  @ApiProperty({ required: true, nullable: true, example: '123-abc' })
  @IsString()
  @IsUUID('all', { each: true })
  @IsOptional()
  ingredientId: string;

  @ApiProperty({ required: true, nullable: true, example: 'egg' })
  @IsString()
  @IsOptional()
  ingredientName: string;
}
