import { Recipe } from '@/modules/recipe/entities/recipe.entity';
import { User } from '@/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
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

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
