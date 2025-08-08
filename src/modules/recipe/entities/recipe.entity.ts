import { Ingredient } from '@/modules/ingredient/entities/ingredient.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  content: string;

  @Column()
  img_url: string;

  @ManyToMany(() => Ingredient)
  @JoinTable()
  ingredients: Ingredient[];
}
