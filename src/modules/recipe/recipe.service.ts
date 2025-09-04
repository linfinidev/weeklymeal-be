import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { In, Like, Repository } from 'typeorm';
import { errorResponse, successResponse } from '@/common/utils';
import { API_SUCCESS_MSG, API_FAIL_MSG } from '@/common/constants/messages';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
import { mapToRecipeDto, mapToRecipeEntity } from '@/mappers/recipeMapper';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { RecipeListResponseDto } from './dtos/response-recipe-list.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,

    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(userId: string, createRecipeDto: CreateRecipeDto) {
    try {
      const ingredients = await this.ingredientRepository.find({
        where: { id: In(createRecipeDto.ingredientIds), user: { id: userId } },
      });
      const recipeEntity = mapToRecipeEntity(createRecipeDto, ingredients);
      const recipe = this.recipeRepository.create({
        ...recipeEntity,
        user: { id: userId } as User,
      });
      const res = await this.recipeRepository.save(recipe);
      return successResponse(API_SUCCESS_MSG, mapToRecipeDto(res));
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async getAll(userId: string, recipeName?: string, page?: string) {
    try {
      const limit = 30;
      const pageNum = page ? parseInt(page) : 1;
      const [recipes, total] = await this.recipeRepository.findAndCount({
        where: { name: Like(`${recipeName || ''}%`), user: { id: userId } },
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

  async getDetails(userId: string, id: string) {
    try {
      const recipe = await this.recipeRepository.findOne({
        where: { id: id, user: { id: userId } },
      });
      const res = mapToRecipeDto(recipe);
      return successResponse(API_SUCCESS_MSG, res);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async update(userId: string, id: string, updateRecipeDto: UpdateRecipeDto) {
    try {
      const recipe = await this.recipeRepository.findOne({
        where: { id: id, user: { id: userId } },
      });
      if (!recipe) {
        throw new NotFoundException('Recipe not found!');
      }
      Object.assign(recipe, updateRecipeDto);
      await this.recipeRepository.save(recipe);
      return successResponse(API_SUCCESS_MSG);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async remove(userId: string, id: string) {
    try {
      const result = await this.recipeRepository.delete({
        id: id,
        user: { id: userId },
      });
      if (result.affected === 0) {
        throw new NotFoundException('Recipe not found');
      }
      return successResponse(API_SUCCESS_MSG);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }
}
