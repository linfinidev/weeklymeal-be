import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();
const envCA: string = configService.get('DB_SSL_CA');
const caCert = Buffer.from(envCA, 'base64').toString('ascii');

export default new DataSource({
  type: 'postgres',
  url: configService.get('DATABASE_URL'),
  ssl:
    configService.get('NODE_ENV') === 'production'
      ? { rejectUnauthorized: true, ca: caCert }
      : false,
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: configService.get('NODE_ENV') === 'production' ? false : true,
  migrationsRun: true,
});
