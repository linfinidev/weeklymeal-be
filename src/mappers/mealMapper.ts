import { DATE_YYYYMMDD_SLASH_FORMAT } from '@/common/constants';
import { convertDatetoString } from '@/common/utils';
import { CreateMealDto } from '@/modules/meal/dtos/create-meal.dto';
import { MealItemResponseDto } from '@/modules/meal/dtos/response-meal-item.dto';
import { MealListItemResponseDto } from '@/modules/meal/dtos/response-meal-list-item.dto';
import { MealResponseDto } from '@/modules/meal/dtos/response-meal.dto';
import { Meal } from '@/modules/meal/entities/meal.entity';
import { Recipe } from '@/modules/recipe/entities/recipe.entity';
import { DateTime } from 'luxon';

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
  dto.recipes = entity.recipes.map((i) => ({ id: i.id, name: i.name }));
  return dto;
};

export const mapToMealItemDto = (entity: Meal): MealItemResponseDto => {
  const dto = new MealItemResponseDto();
  dto.id = entity.id;
  dto.recipeNames = entity.recipes.map((i) => i.id);
  return dto;
};

export const mapToMealListDtos = (
  entities: Meal[],
  startDate: string,
  endDate: string,
): MealListItemResponseDto[] => {
  const start = DateTime.fromFormat(startDate, DATE_YYYYMMDD_SLASH_FORMAT);
  const end = DateTime.fromFormat(endDate, DATE_YYYYMMDD_SLASH_FORMAT);

  // Pre-group meals by date+type for faster lookup
  const grouped = new Map<string, Record<string, Meal>>();
  for (const meal of entities) {
    const key = convertDatetoString(meal.date);
    if (!grouped.has(key)) grouped.set(key, {});
    grouped.get(key)[meal.type] = meal;
  }
  const days = end.diff(start, 'days').days;
  const res: MealListItemResponseDto[] = [];

  for (let i = 0; i <= days; i++) {
    const calculatingDate = start.plus({ days: i });
    const dateKey = calculatingDate.toFormat(DATE_YYYYMMDD_SLASH_FORMAT);

    const resItem = new MealListItemResponseDto();
    resItem.date = dateKey;

    const dayMeals = grouped.get(dateKey) ?? {};
    resItem.lunch = dayMeals.lunch ? mapToMealItemDto(dayMeals.lunch) : null;
    resItem.dinner = dayMeals.dinner ? mapToMealItemDto(dayMeals.dinner) : null;

    res.push(resItem);
  }

  return res;
};
