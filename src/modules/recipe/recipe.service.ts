import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { In, Like, Repository } from 'typeorm';
import { errorResponse, successResponse } from '@/common/utils';
import { API_SUCCESS_MSG, API_FAIL_MSG } from '@/common/constants/messages';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { mapToRecipeDto, mapToRecipeEntity } from '@/mappers/recipeMapper';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { RecipeListResponseDto } from './dto/response-recipe-list.dto';

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

  async getAll(recipeName?: string, page?: string) {
    try {
      const limit = 30;
      const pageNum = page ? parseInt(page) : 1;
      const [recipes, total] = await this.recipeRepository.findAndCount({
        where: { name: Like(`${recipeName || ''}%`) },
        relations: ['ingredients'],
        skip: (pageNum - 1) * limit,
        take: limit,
        order: { createdAt: 'DESC' }, // optional
      });

      const res: RecipeListResponseDto = {
        items: recipes.map((item) => ({ id: item.id, name: item.name })),
        total,
        pageNum,
        limit,
        totalPages: Math.ceil(total / limit),
      };
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
