import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { DataSource, ILike, Repository } from 'typeorm';
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
      newRecipe.recipeIngredients = recipeIngredients;
      return newRecipe;
    });
    return successResponse(API_SUCCESS_MSG, mapToRecipeDto(recipe));
  }

  async getAll(userId: string, recipeName?: string, page?: string) {
    const limit = 30;
    const pageNum = page ? parseInt(page) : 1;
    const [recipes, total] = await this.recipeRepository.findAndCount({
      where: { name: ILike(`%${recipeName || ''}%`), user: { id: userId } },
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
      relations: ['recipeIngredients'],
    });
    if (!recipe) {
      throwErrorResponse('Recipe not found', HttpStatus.NOT_FOUND);
    }
    const res = mapToRecipeDto(recipe);
    return successResponse(API_SUCCESS_MSG, res);
  }

  async update(userId: string, id: string, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.recipeRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['recipeIngredients', 'recipeIngredients.ingredient'],
    });
    if (!recipe) {
      throwErrorResponse('Recipe not found', HttpStatus.NOT_FOUND);
    }

    await this.datasource.transaction(async (manager) => {
      // 1️⃣ Update main recipe fields
      recipe.name = updateRecipeDto.name ?? recipe.name;
      recipe.intructions = updateRecipeDto.instructions ?? recipe.intructions;
      recipe.imgUrl = updateRecipeDto.imgUrl ?? recipe.imgUrl;

      // 2️⃣ Get current and incoming ingredient sets
      const existingRIs = recipe.recipeIngredients;
      const updatedRIs = updateRecipeDto.recipeIngredients;

      // Track new list
      const newRecipeIngredients: RecipeIngredient[] = [];

      for (const riDto of updatedRIs) {
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

        // Check if recipe already had this ingredient
        const existingRI = existingRIs.find(
          (ri) => ri.ingredient.id === ingredient.id,
        );

        if (existingRI) {
          // Update existing
          existingRI.unit = riDto.unit;
          await manager.save(existingRI);
          newRecipeIngredients.push(existingRI);
        } else {
          // Create new
          const newRI = manager.create(RecipeIngredient, {
            recipe,
            ingredient,
            unit: riDto.unit,
          });
          await manager.save(newRI);
          newRecipeIngredients.push(newRI);
        }
      }

      // 3️⃣ Delete removed ingredients
      const toDelete = existingRIs.filter(
        (ri) =>
          !newRecipeIngredients.find(
            (nri) => nri.ingredient.id === ri.ingredient.id,
          ),
      );
      if (toDelete.length > 0) {
        await manager.remove(toDelete);
      }

      // 4️⃣ Update relation reference
      recipe.recipeIngredients = newRecipeIngredients;
      await manager.save(recipe);
    });

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
