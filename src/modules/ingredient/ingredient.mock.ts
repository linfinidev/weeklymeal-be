import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { IngredientResponseDto } from './dto/response-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';

export const mockIngredientsRes: IngredientResponseDto[] = [
  {
    id: '1',
    name: 'tomato',
  },
];

export const mockCreateIngredientReq: CreateIngredientDto = { name: 'tomato' };

export const mockUpdateIngredientReq: UpdateIngredientDto = { name: 'eggs' };

export const mockIngredients: Ingredient[] = [
  { id: '1', name: 'tomato', createdAt: new Date(), updatedAt: new Date() },
];

export const mockIngredient: Ingredient = mockIngredients[0];

export const mockIngredientId = '1';
