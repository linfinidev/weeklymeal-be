import { Ingredient } from '@/modules/ingredient/entities/ingredient.entity';
import { User } from '@/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Grocery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  qty: string;

  @Column({ name: 'from_date' })
  fromDate: string;

  @Column({ name: 'from_date' })
  toDate: string;

  @Column({ name: 'ingredient_id', type: 'uuid' })
  ingredientId: string;

  @OneToOne(() => Ingredient)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
