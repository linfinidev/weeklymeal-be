import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { In, Like, Repository } from 'typeorm';
import { errorResponse, successResponse } from '@/common/utils';
import { API_SUCCESS_MSG, API_FAIL_MSG } from '@/common/constants/messages';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import {
  mapToRecipeDto,
  mapToRecipeDtos,
  mapToRecipeEntity,
} from '@/mappers/recipeMapper';
import { Ingredient } from '../ingredient/entities/ingredient.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,

    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto) {
    try {
      const ingredients = await this.ingredientRepository.find({
        where: { id: In(createRecipeDto.ingredientIds) },
      });
      const recipeEntity = mapToRecipeEntity(createRecipeDto, ingredients);
      const recipe = this.recipeRepository.create(recipeEntity);
      const res = await this.recipeRepository.save(recipe);
      return successResponse(API_SUCCESS_MSG, mapToRecipeDto(res));
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async getAll(recipeName?: string) {
    try {
      const recipes = await this.recipeRepository.find({
        where: { name: Like(`${recipeName || ''}%`) },
        relations: ['ingredients'],
      });
      const res = mapToRecipeDtos(recipes);
      return successResponse(API_SUCCESS_MSG, res);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async getDetails(id: string) {
    try {
      const recipe = await this.recipeRepository.findOneBy({ id: id });
      const res = mapToRecipeDto(recipe);
      return successResponse(API_SUCCESS_MSG, res);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    try {
      const recipe = await this.recipeRepository.findOneBy({ id: id });
      Object.assign(recipe, updateRecipeDto);
      await this.recipeRepository.save(recipe);
      return successResponse(API_SUCCESS_MSG);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async remove(id: string) {
    try {
      await this.recipeRepository.delete(id);
      return successResponse(API_SUCCESS_MSG);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }
}
