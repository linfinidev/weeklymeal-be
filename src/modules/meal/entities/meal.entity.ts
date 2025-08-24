import { Recipe } from '@/modules/recipe/entities/recipe.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
    transformer: {
      to: (value: Date) => value, // store as is
      from: (value: string) => new Date(value), // parse string to Date
    },
  })
  date: Date;

  @Column()
  type: string;

  @ManyToMany(() => Recipe)
  @JoinTable()
  recipes: Recipe[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
