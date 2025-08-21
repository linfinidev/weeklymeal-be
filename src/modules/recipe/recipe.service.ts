import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Like, Repository } from 'typeorm';
import {
  errorResponse,
  successResponse,
} from '@/common/utils/api-response.util';
import { API_SUCCESS_MSG, API_FAIL_MSG } from '@/lib/messages';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { plainToInstance } from 'class-transformer';
import { RecipeResponseDto } from './dto/response-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto) {
    try {
      const recipe = this.recipeRepository.create(createRecipeDto);
      const res = plainToInstance(RecipeResponseDto, recipe, {
        excludeExtraneousValues: true,
      });
      await this.recipeRepository.save(recipe);
      return successResponse(API_SUCCESS_MSG, res);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async getAll(recipeName: string) {
    try {
      const recipes = await this.recipeRepository.find({
        where: { name: Like(`${recipeName}%`) },
      });
      const res = plainToInstance(RecipeResponseDto, recipes, {
        excludeExtraneousValues: true,
      });
      return successResponse(API_SUCCESS_MSG, res);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async getDetails(id: string) {
    try {
      const recipe = await this.recipeRepository.findOneBy({ id: id });
      const res = plainToInstance(RecipeResponseDto, recipe, {
        excludeExtraneousValues: true,
      });
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
