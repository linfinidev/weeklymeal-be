import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  content: string;

  @Column()
  img_url: string;

  @Column('uuid', { array: true })
  ingredients: string[];
}
