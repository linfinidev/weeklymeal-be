import { PaginatedDto } from '@/common/dtos/api-paginated.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeListItemResponseDto } from './dto/response-recipe-list-item.dto';
import { RecipeResponseDto } from './dto/response-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';

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
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockRecipe: Recipe = mockRecipes[0];

export const mockRecipeId = '1';
