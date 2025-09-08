import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();
const env: string = configService.get('NODE_ENV')
  ? configService.get('NODE_ENV')
  : '';
const envCA: string = configService.get('DB_SSL_CA')
  ? configService.get('DB_SSL_CA')
  : '';
const caCert = Buffer.from(envCA, 'base64').toString('ascii');

export default new DataSource({
  type: 'postgres',
  url: configService.get('DATABASE_URL'),
  ssl: env.startsWith('production')
    ? { rejectUnauthorized: true, ca: caCert }
    : false,
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: env.startsWith('production') ? false : true,
  migrationsRun: true,
});
