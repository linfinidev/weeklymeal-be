import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  url: configService.get('DATABASE_URL'),
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: configService.get('NODE_ENV') === 'production' ? false : true,
  migrationsRun: true,
  schema: 'weekly_meal',
  extra: {
    options: '-c search_path=weekly_meal',
  },
});
