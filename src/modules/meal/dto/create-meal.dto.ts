import { IsString, IsUUID } from 'class-validator';

export class CreateMealDto {
  @IsString()
  date: string;

  @IsString()
  type: string;

  @IsUUID('4')
  recipe_id: string;
}
