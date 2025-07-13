import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Fridge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  qty: string;
}
