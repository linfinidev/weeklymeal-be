/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Column, IsUUID } from 'sequelize-typescript';
import { IsString } from 'class-validator';

export class CreateMealDto {
  @IsString()
  @Column
  date: string;

  @Column
  type: string;

  @IsUUID('4')
  @Column
  recipe_id: string;
}
