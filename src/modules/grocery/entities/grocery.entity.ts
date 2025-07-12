import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Fridge } from 'src/modules/fridge/entities/fridge.entity';
import { Recipe } from 'src/modules/recipe/entities/recipe.entity';

@Table
export class Grocery extends Model {
  @Column
  name: string;

  @Column
  qty: string;

  @ForeignKey(() => Recipe)
  @Column
  recipe_id: string;

  @BelongsTo(() => Recipe)
  recipe: Recipe;

  @ForeignKey(() => Fridge)
  @Column
  Fridge_id: string;

  @BelongsTo(() => Fridge)
  fridge: Fridge;
}
