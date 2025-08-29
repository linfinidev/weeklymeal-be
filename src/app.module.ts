import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { DatabaseModule } from './database/database.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { MealModule } from './modules/meal/meal.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    IngredientModule,
    RecipeModule,
    MealModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
