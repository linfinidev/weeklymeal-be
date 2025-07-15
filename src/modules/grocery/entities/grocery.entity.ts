import { Ingredient } from '@/modules/ingredient/entities/ingredient.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Grocery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  qty: string;

  @Column()
  from_date: string;

  @Column()
  to_date: string;

  @Column({ type: 'uuid' })
  ingredient_id: string;

  @OneToOne(() => Ingredient)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;
}
