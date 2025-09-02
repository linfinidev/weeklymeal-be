import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, Recipe, User])],
  controllers: [MealController],
  providers: [MealService],
  exports: [TypeOrmModule],
})
export class MealModule {}
