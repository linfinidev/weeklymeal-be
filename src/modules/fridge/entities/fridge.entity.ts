import { Ingredient } from '@/modules/ingredient/entities/ingredient.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Fridge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  qty: string;

  @Column()
  bought_date: string;

  @Column()
  expired_date: string;

  @Column({ type: 'uuid' })
  ingredient_id: string;

  @OneToOne(() => Ingredient)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;
}
