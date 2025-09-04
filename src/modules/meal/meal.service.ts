import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMealDto } from './dtos/create-meal.dto';
import { UpdateMealDto } from './dtos/update-meal.dto';
import { Between, In, Repository } from 'typeorm';
import { Meal } from './entities/meal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  mapToMealDto,
  mapToMealEntity,
  mapToMealListDtos,
} from '@/mappers/mealMapper';
import { successResponse, errorResponse } from '@/common/utils';
import { API_SUCCESS_MSG, API_FAIL_MSG } from '@/common/constants/messages';
import { Recipe } from '../recipe/entities/recipe.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,

    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async create(userId: string, createMealDto: CreateMealDto) {
    try {
      const recipes = await this.recipeRepository.find({
        where: {
          id: In(createMealDto.recipe_ids),
          user: { id: userId } as User,
        },
        relations: ['ingredients'],
      });
      const mealEntity = mapToMealEntity(createMealDto, recipes);
      const meal = this.mealRepository.create(mealEntity);
      const res = await this.mealRepository.save(meal);
      return successResponse(API_SUCCESS_MSG, mapToMealDto(res));
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async getAll(userId: string, startDate: string, endDate: string) {
    try {
      const meals = await this.mealRepository.find({
        where: {
          date: Between(new Date(startDate), new Date(endDate)),
          user: { id: userId },
        },
        relations: ['recipes', 'recipes.ingredients'],
      });
      const res = mapToMealListDtos(meals, startDate, endDate);
      return successResponse(API_SUCCESS_MSG, res);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async getDetails(userId: string, id: string) {
    try {
      const meal = await this.mealRepository.findOne({
        where: { id: id, user: { id: userId } },
      });
      const res = mapToMealDto(meal);
      return successResponse(API_SUCCESS_MSG, res);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async update(userId: string, id: string, updateMealDto: UpdateMealDto) {
    try {
      const meal = await this.mealRepository.findOne({
        where: { id: id, user: { id: userId } },
      });
      if (!meal) {
        throw new NotFoundException('Meal not found');
      }
      Object.assign(meal, updateMealDto);
      await this.mealRepository.save(meal);
      return successResponse(API_SUCCESS_MSG);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async remove(userId: string, id: string) {
    try {
      const result = await this.mealRepository.delete({
        id: id,
        user: { id: userId },
      });
      if (result.affected === 0) {
        throw new NotFoundException('Meal not found');
      }
      return successResponse(API_SUCCESS_MSG);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }
}
