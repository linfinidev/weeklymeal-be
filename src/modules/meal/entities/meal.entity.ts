import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Recipe } from 'src/modules/recipe/entities/recipe.entity';

@Table
export class Meal extends Model {
  @Column
  date: string;

  @Column
  type: string;

  @ForeignKey(() => Recipe)
  @Column
  recipe_id: string;

  @BelongsTo(() => Recipe)
  recipe: Recipe;
}
