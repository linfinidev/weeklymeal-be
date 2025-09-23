import { PaginatedDto } from '@/common/dtos/api-paginated.dto';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { RecipeListItemResponseDto } from './dtos/response-recipe-list-item.dto';
import { RecipeResponseDto } from './dtos/response-recipe.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { mockUser } from '../user/user.mock';

export const mockPaginatedRecipesRes: PaginatedDto<RecipeListItemResponseDto> =
  {
    limit: 30,
    pageNum: 1,
    total: 1,
    totalPages: 1,
    items: [
      {
        id: '1',
        name: 'tomato soup',
      },
    ],
  };

export const mockRecipesRes: RecipeResponseDto[] = [
  {
    id: '1',
    name: 'tomato soup',
    intructions: '- Dice tomato\n- Crack 2 eggs',
    img_url: 'imgSrc',
    ingredientIds: ['1', '2'],
  },
];

export const mockRecipeRes: RecipeResponseDto = mockRecipesRes[0];

export const mockRecipeListRes: RecipeListItemResponseDto[] = [
  {
    id: '1',
    name: 'tomato soup',
  },
];

export const mockCreateRecipeReq: CreateRecipeDto = {
  name: 'tomato soup',
  instructions: '- Dice tomato\n- Crack 2 eggs',
  img_url: 'imgSrc',
  recipeIngredients: [{ ingredientId: '1', unit: null }],
};

export const mockUpdateRecipeReq: UpdateRecipeDto = {
  name: 'tomato soup',
  instructions: '- Dice 2 tomato\n- Crack 2 eggs',
  img_url: 'imgSrc',
  recipeIngredients: [{ ingredientId: '1', unit: null }],
};

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'tomato soup',
    intructions: '- Dice tomato\n- Crack 2 eggs',
    img_url: 'imgSrc',
    recipeIngredients: [
      {
        id: '1',
        ingredient: {
          id: '1',
          name: 'tomato',
          createdAt: new Date(),
          updatedAt: new Date(),
          user: mockUser,
        },
        unit: '1 cup',
        recipe: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    user: mockUser,
  },
];

export const mockRecipe: Recipe = mockRecipes[0];

export const mockRecipeId = '1';
