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

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto) {
    try {
      const recipe = this.recipeRepository.create(createRecipeDto);
      await this.recipeRepository.save(recipe);
      return successResponse(API_SUCCESS_MSG);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async findAll(ingredientName: string) {
    try {
      const recipes = await this.recipeRepository.find({
        where: { name: Like(`${ingredientName}%`) },
      });
      return successResponse(API_SUCCESS_MSG, recipes);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    try {
      const recipe = await this.recipeRepository.findOne({
        where: { id: id },
      });
      Object.assign(recipe, updateRecipeDto);
      await this.recipeRepository.save(recipe);
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
