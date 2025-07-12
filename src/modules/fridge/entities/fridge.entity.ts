import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Fridge extends Model {
  @Column
  name: string;

  @Column
  qty: string;
}
