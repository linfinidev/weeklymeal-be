import { Ingredient } from '@/modules/ingredient/entities/ingredient.entity';
import { User } from '@/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'recipes' })
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column('text', { nullable: false })
  content: string;

  @Column({ nullable: true })
  img_url: string;

  @ManyToMany(() => Ingredient, { cascade: true })
  @JoinTable({
    name: 'recipe_ingredients',
    joinColumn: {
      name: 'recipe_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ingredient_id',
      referencedColumnName: 'id',
    },
  })
  ingredients: Ingredient[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
