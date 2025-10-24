import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class RecipeIngredientResponseDto {
  @ApiProperty({ required: true, nullable: false, example: '1 gram' })
  unit: string;

  @ApiProperty({ required: true, nullable: false, example: '123-abc' })
  @IsString()
  @IsUUID('all', { each: true })
  ingredientId: string;
}
