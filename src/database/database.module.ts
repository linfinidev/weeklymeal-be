import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl:
        process.env.NODE_ENV === 'production'
          ? {
              rejectUnauthorized: true,
              ca: Buffer.from(process.env.DB_SSL_CA, 'base64').toString(
                'ascii',
              ),
            }
          : false,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
    }),
  ],
})
export class DatabaseModule {}
