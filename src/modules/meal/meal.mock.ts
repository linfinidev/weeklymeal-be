import { mockRecipes } from '../recipe/recipe.mock';
import { mockUser } from '../user/user.mock';
import { CreateMealDto } from './dtos/create-meal.dto';
import { MealListItemResponseDto } from './dtos/response-meal-list-item.dto';
import { MealResponseDto } from './dtos/response-meal.dto';
import { UpdateMealDto } from './dtos/update-meal.dto';
import { Meal } from './entities/meal.entity';

export const startDate = '2025/08/01';

export const endDate = '2025/08/31';

export const mockMealId = '1';

export const mockMealListRes: MealListItemResponseDto[] = [
  {
    date: '2025/08/01',
    dinner: {
      id: '1',
      recipeNames: ['bun', 'com'],
    },
    lunch: null,
  },
];

export const mockMealsRes: MealResponseDto[] = [
  {
    id: '1',
    date: '2025/08/01',
    type: 'lunch',
    recipeIds: ['1', '2'],
  },
];

export const mockMealRes: MealResponseDto = mockMealsRes[0];

export const mockCreateMealReq: CreateMealDto = {
  date: '2025/08/01',
  type: 'lunch',
  recipeIds: ['uuid-1', 'uuid-2'],
};

export const mockUpdateMealReq: UpdateMealDto = {
  date: '2025/08/01',
  type: 'dinner',
  recipeIds: ['uuid-1', 'uuid-2'],
};

export const mockMeals: Meal[] = [
  {
    id: '1',
    date: new Date('2025-08-01'),
    type: 'lunch',
    recipes: mockRecipes,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: mockUser,
  },
];

export const mockMeal: Meal = mockMeals[0];
