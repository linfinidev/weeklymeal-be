import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();
console.log('CA cert:', process.env.DB_SSL_CA?.slice(0, 30));

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          rejectUnauthorized: true,
          ca: process.env.DB_SSL_CA,
        }
      : undefined,
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  migrationsRun: true,
});
