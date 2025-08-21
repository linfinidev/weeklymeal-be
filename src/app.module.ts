import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { DatabaseModule } from './database/database.module';
import { RecipeModule } from './modules/recipe/recipe.module';

@Module({
  imports: [DatabaseModule, IngredientModule, RecipeModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
