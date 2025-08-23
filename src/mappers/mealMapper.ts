import { convertDatetoString } from '@/common/utils';
import { CreateMealDto } from '@/modules/meal/dto/create-meal.dto';
import { MealResponseDto } from '@/modules/meal/dto/response-meal.dto';
import { Meal } from '@/modules/meal/entities/meal.entity';
import { Recipe } from '@/modules/recipe/entities/recipe.entity';

export const mapToMealEntity = (
  dto: CreateMealDto,
  recipes: Recipe[],
): Meal => {
  const meal = new Meal();
  meal.date = new Date(dto.date);
  meal.type = dto.type;
  meal.recipes = recipes;
  return meal;
};

export const mapToMealDto = (entity: Meal): MealResponseDto => {
  const dto = new MealResponseDto();
  dto.id = entity.id;
  dto.date = convertDatetoString(entity.date);
  dto.type = entity.type;
  dto.recipe_ids = entity.recipes.map((i) => i.id);
  return dto;
};

export const mapToMealDtos = (entities: Meal[]): MealResponseDto[] => {
  return entities.map(mapToMealDto);
};
