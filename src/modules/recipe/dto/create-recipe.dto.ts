import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsUUID } from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty({ required: true, example: 'Tomato' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, example: 'Crack 2 eggs,...' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ required: false, example: 'imgSrc' })
  img_url: string;

  @ApiProperty({
    required: true,
    type: [String],
    example: ['uuid-1', 'uuid-2'],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  ingredientIds: string[];
}
