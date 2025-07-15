import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, IngredientModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
