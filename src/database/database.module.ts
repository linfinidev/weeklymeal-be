import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      autoLoadModels: true,
      synchronize: true, // TODO: false in production
    }),
  ],
})
export class DatabaseModule {}
