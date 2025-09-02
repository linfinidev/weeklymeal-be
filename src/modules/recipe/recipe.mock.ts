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
    content: '- Dice tomato\n- Crack 2 eggs',
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
  content: '- Dice tomato\n- Crack 2 eggs',
  img_url: 'imgSrc',
  ingredientIds: ['1'],
};

export const mockUpdateRecipeReq: UpdateRecipeDto = {
  name: 'tomato soup',
  content: '- Dice 2 tomato\n- Crack 2 eggs',
  img_url: 'imgSrc',
  ingredientIds: ['1'],
};

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'tomato soup',
    content: '- Dice tomato\n- Crack 2 eggs',
    img_url: 'imgSrc',
    ingredients: [
      {
        id: '1',
        name: 'tomato',
        createdAt: new Date(),
        updatedAt: new Date(),
        user: mockUser,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    user: mockUser,
  },
];

export const mockRecipe: Recipe = mockRecipes[0];

export const mockRecipeId = '1';
