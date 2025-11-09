import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
import { successResponse, throwErrorResponse } from '@/common/utils';
import { API_SUCCESS_MSG } from '@/common/constants/messages';
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
    const existingMeal = await this.mealRepository.findOne({
      where: {
        date: new Date(createMealDto.date),
        type: createMealDto.type,
      },
    });
    if (existingMeal) {
      throwErrorResponse('Meal already exists', HttpStatus.BAD_REQUEST);
    }
    const recipes = await this.recipeRepository.find({
      where: {
        id: In(createMealDto.recipeIds),
        user: { id: userId } as User,
      },
      relations: ['recipeIngredients'],
    });
    const mealEntity = mapToMealEntity(createMealDto, recipes);
    const meal = this.mealRepository.create({
      ...mealEntity,
      user: { id: userId } as User,
    });
    const res = await this.mealRepository.save(meal);
    return successResponse(API_SUCCESS_MSG, mapToMealDto(res));
  }

  async getAll(userId: string, startDate: string, endDate: string) {
    const meals = await this.mealRepository.find({
      where: {
        date: Between(new Date(startDate), new Date(endDate)),
        user: { id: userId },
      },
      relations: ['recipes'],
    });
    const res = mapToMealListDtos(meals, startDate, endDate);
    return successResponse(API_SUCCESS_MSG, res);
  }

  async getDetails(userId: string, id: string) {
    const meal = await this.mealRepository.findOne({
      where: { id: id, user: { id: userId } },
      relations: ['recipes'],
    });
    if (!meal) {
      throwErrorResponse('Meal not found', HttpStatus.NOT_FOUND);
    }
    const res = mapToMealDto(meal);
    return successResponse(API_SUCCESS_MSG, res);
  }

  async update(userId: string, id: string, updateMealDto: UpdateMealDto) {
    const meal = await this.mealRepository.findOne({
      where: { id: id, user: { id: userId } },
    });
    if (!meal) {
      throw new NotFoundException('Meal not found');
    }
    Object.assign(meal, updateMealDto);
    await this.mealRepository.save(meal);
    return successResponse(API_SUCCESS_MSG);
  }

  async remove(userId: string, id: string) {
    const result = await this.mealRepository.delete({
      id: id,
      user: { id: userId },
    });
    if (result.affected === 0) {
      throwErrorResponse('Meal not found', HttpStatus.NOT_FOUND);
    }
    return successResponse(API_SUCCESS_MSG);
  }
}
