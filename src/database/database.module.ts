import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { readFileSync } from 'fs';

const caCert = readFileSync('src/database/ca.pem').toString();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl:
        process.env.NODE_ENV === 'production'
          ? {
              rejectUnauthorized: true,
              ca: caCert,
            }
          : undefined,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
    }),
  ],
})
export class DatabaseModule {}
