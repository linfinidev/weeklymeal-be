import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { Recipe } from './entities/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from '../ingredient/entities/ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Ingredient])],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [TypeOrmModule],
})
export class RecipeModule {}
