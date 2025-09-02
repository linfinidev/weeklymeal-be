import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { DatabaseModule } from './database/database.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { MealModule } from './modules/meal/meal.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';

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
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
