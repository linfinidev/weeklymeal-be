import { Ingredient } from '@/modules/ingredient/entities/ingredient.entity';
import { CreateRecipeDto } from '@/modules/recipe/dtos/create-recipe.dto';
import { RecipeResponseDto } from '@/modules/recipe/dtos/response-recipe.dto';
import { Recipe } from '@/modules/recipe/entities/recipe.entity';

export const mapToRecipeEntity = (
  dto: CreateRecipeDto,
  ingredients: Ingredient[],
): Recipe => {
  const recipe = new Recipe();
  recipe.name = dto.name;
  recipe.content = dto.content;
  recipe.img_url = dto.img_url;
  recipe.ingredients = ingredients;
  return recipe;
};

export const mapToRecipeDto = (entity: Recipe): RecipeResponseDto => {
  const dto = new RecipeResponseDto();
  dto.id = entity.id;
  dto.name = entity.name;
  dto.content = entity.content;
  dto.img_url = entity.img_url ?? null;
  dto.ingredientIds = entity.ingredients.map((i) => i.id);
  return dto;
};

export const mapToRecipeDtos = (entities: Recipe[]): RecipeResponseDto[] => {
  return entities.map(mapToRecipeDto);
};
