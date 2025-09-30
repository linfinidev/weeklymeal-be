import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { DataSource, Like, Repository } from 'typeorm';
import { throwErrorResponse, successResponse } from '@/common/utils';
import { API_SUCCESS_MSG } from '@/common/constants/messages';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
import { mapToRecipeDto } from '@/mappers/recipeMapper';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { RecipeListResponseDto } from './dtos/response-recipe-list.dto';
import { User } from '../user/entities/user.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    private datasource: DataSource,
  ) {}

  async create(userId: string, createRecipeDto: CreateRecipeDto) {
    const recipe = await this.datasource.transaction(async (manager) => {
      const newRecipe = manager.create(Recipe, {
        name: createRecipeDto.name,
        intructions: createRecipeDto.instructions,
        imgUrl: createRecipeDto.imgUrl,
        user: { id: userId } as User,
      });
      await manager.save(newRecipe);

      const recipeIngredients: RecipeIngredient[] = [];
      for (const riDto of createRecipeDto.recipeIngredients) {
        let ingredient: Ingredient;

        if (riDto.ingredientId) {
          ingredient = await manager.findOneBy(Ingredient, {
            id: riDto.ingredientId,
          });
          if (!ingredient) {
            throwErrorResponse('ingredient not found', HttpStatus.NOT_FOUND);
          }
        } else {
          ingredient = manager.create(Ingredient, {
            name: riDto.ingredientName.toLowerCase(),
            user: { id: userId } as User,
          });
          await manager.save(ingredient);
        }

        const ri = manager.create(RecipeIngredient, {
          recipe: newRecipe,
          ingredient: ingredient,
          unit: riDto.unit,
        });
        recipeIngredients.push(ri);
      }
      await manager.save(RecipeIngredient, recipeIngredients);
      return newRecipe;
    });
    return successResponse(API_SUCCESS_MSG, mapToRecipeDto(recipe));
  }

  async getAll(userId: string, recipeName?: string, page?: string) {
    const limit = 30;
    const pageNum = page ? parseInt(page) : 1;
    const [recipes, total] = await this.recipeRepository.findAndCount({
      where: { name: Like(`${recipeName || ''}%`), user: { id: userId } },
      relations: ['recipeIngredients'],
      skip: (pageNum - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    const res: RecipeListResponseDto = {
      items:
        recipes.length > 0
          ? recipes.map((item) => ({ id: item.id, name: item.name }))
          : [],
      total,
      pageNum,
      limit,
      totalPages: Math.ceil(total / limit),
    };
    return successResponse(API_SUCCESS_MSG, res);
  }

  async getDetails(userId: string, id: string) {
    const recipe = await this.recipeRepository.findOne({
      where: { id: id, user: { id: userId } },
    });
    if (!recipe) {
      throwErrorResponse('Recipe not found', HttpStatus.NOT_FOUND);
    }
    const res = mapToRecipeDto(recipe);
    return successResponse(API_SUCCESS_MSG, res);
  }

  async update(userId: string, id: string, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.recipeRepository.findOne({
      where: { id: id, user: { id: userId } },
    });
    if (!recipe) {
      throwErrorResponse('Recipe not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(recipe, updateRecipeDto);
    await this.recipeRepository.save(recipe);
    return successResponse(API_SUCCESS_MSG);
  }

  async remove(userId: string, id: string) {
    const result = await this.recipeRepository.delete({
      id: id,
      user: { id: userId },
    });
    if (result.affected === 0) {
      throwErrorResponse('Recipe not found', HttpStatus.NOT_FOUND);
    }
    return successResponse(API_SUCCESS_MSG);
  }
}
