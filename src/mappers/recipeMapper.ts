import { CreateRecipeDto } from '@/modules/recipe/dtos/create-recipe.dto';
import { RecipeResponseDto } from '@/modules/recipe/dtos/response-recipe.dto';
import { RecipeIngredient } from '@/modules/recipe/entities/recipe-ingredient.entity';
import { Recipe } from '@/modules/recipe/entities/recipe.entity';

export const mapToRecipeEntity = (
  dto: CreateRecipeDto,
  recipeIngredients: RecipeIngredient[],
): Recipe => {
  const recipe = new Recipe();
  recipe.name = dto.name;
  recipe.intructions = dto.instructions;
  recipe.imgUrl = dto.imgUrl;
  recipe.recipeIngredients = recipeIngredients;
  return recipe;
};

export const mapToRecipeDto = (entity: Recipe): RecipeResponseDto => {
  const dto = new RecipeResponseDto();
  dto.id = entity.id;
  dto.name = entity.name;
  dto.intructions = entity.intructions;
  dto.imgUrl = entity.imgUrl ?? null;
  dto.ingredientIds = entity.recipeIngredients.map((i) => i.id);
  return dto;
};

export const mapToRecipeDtos = (entities: Recipe[]): RecipeResponseDto[] => {
  return entities.map(mapToRecipeDto);
};
