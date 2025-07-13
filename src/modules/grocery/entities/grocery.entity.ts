import { Fridge } from '@/modules/fridge/entities/fridge.entity';
import { Recipe } from '@/modules/recipe/entities/recipe.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Grocery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  qty: string;

  @Column()
  date: string;

  @Column({ type: 'uuid' })
  recipe_id: string;

  @ManyToOne(() => Recipe)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @Column({ type: 'uuid' })
  fridge_id: string;

  @ManyToOne(() => Fridge)
  @JoinColumn({ name: 'fridge_id' })
  fridge: Recipe;
}
