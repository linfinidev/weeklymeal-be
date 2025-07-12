import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Recipe extends Model {
  @Column
  name: string;

  @Column
  content: string;

  @Column
  img_url: string;
}
