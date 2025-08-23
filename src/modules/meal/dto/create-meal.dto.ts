import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMealDto {
  @ApiProperty({ required: true, example: '2025/08/01' })
  @IsDefined({ message: 'date is required' })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ required: true, example: 'lunch' })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    required: true,
    type: [String],
    example: ['uuid-1', 'uuid-2'],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  recipe_ids: string[];
}
