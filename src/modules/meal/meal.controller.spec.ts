import { Test, TestingModule } from '@nestjs/testing';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { Meal } from './entities/meal.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Recipe } from '../recipe/entities/recipe.entity';
import { successResponse } from '@/common/utils';
import { API_SUCCESS_MSG } from '@/common/constants/messages';
import {
  endDate,
  mockCreateMealReq,
  mockMealId,
  mockMealRes,
  mockMealsRes,
  mockUpdateMealReq,
  startDate,
} from './meal.mock';

describe('MealController', () => {
  let mealController: MealController;
  let mealService: MealService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealController],
      providers: [
        MealService,
        {
          provide: getRepositoryToken(Meal),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Recipe),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    mealController = module.get<MealController>(MealController);
    mealService = module.get<MealService>(MealService);
  });

  it('should be defined', () => {
    expect(mealController).toBeDefined();
  });

  it('getAll', async () => {
    jest
      .spyOn(mealService, 'getAll')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG, mockMealsRes)),
      );
    const response = await mealController.getMeals(startDate, endDate);
    expect(response).toEqual(successResponse(API_SUCCESS_MSG, mockMealsRes));
  });

  it('getDetails', async () => {
    jest
      .spyOn(mealService, 'getDetails')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG, mockMealRes)),
      );
    const response = await mealController.getMealDetails(mockMealId);
    expect(response).toEqual(successResponse(API_SUCCESS_MSG, mockMealRes));
  });

  it('create', async () => {
    jest
      .spyOn(mealService, 'create')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await mealController.createMeal(mockCreateMealReq);
    expect(response.success).toBeTruthy();
  });

  it('update', async () => {
    jest
      .spyOn(mealService, 'update')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await mealController.updateMeal(
      mockMealId,
      mockUpdateMealReq,
    );
    expect(response.success).toBeTruthy();
  });

  it('remove', async () => {
    jest
      .spyOn(mealService, 'remove')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await mealController.removeMeal(mockMealId);
    expect(response.success).toBeTruthy();
  });
});
