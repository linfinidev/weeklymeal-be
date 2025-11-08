import { Test, TestingModule } from '@nestjs/testing';
import { MealService } from './meal.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import {
  endDate,
  mockMeal,
  mockMealId,
  mockMeals,
  mockUpdateMealReq,
  startDate,
} from './meal.mock';
import { Between } from 'typeorm';
import { mockUserId } from '../user/user.mock';

describe('MealService', () => {
  let mealService: MealService;
  let mealRepository: Record<string, jest.Mock>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    mealService = module.get<MealService>(MealService);
    mealRepository = module.get(getRepositoryToken(Meal));
  });

  it('should be defined', () => {
    expect(mealService).toBeDefined();
  });

  it('should find meals by date range', async () => {
    mealRepository.find.mockResolvedValue(mockMeals);

    await mealService.getAll(mockUserId, startDate, endDate);
    expect(mealRepository.find).toHaveBeenCalledWith({
      where: {
        date: Between(new Date(startDate), new Date(endDate)),
        user: { id: mockUserId },
      },
      relations: ['recipes', 'recipes.recipeIngredients'],
    });
  });

  it('should find meal by id', async () => {
    mealRepository.findOne.mockResolvedValue(mockMeal);

    await mealService.getDetails(mockUserId, mockMealId);
    expect(mealRepository.findOne).toHaveBeenCalledWith({
      where: { id: mockMealId, user: { id: mockUserId } },
      relations: ['recipes'],
    });
  });

  it('should update meal by id', async () => {
    mealRepository.findOne.mockResolvedValue(mockMeal);

    await mealService.update(mockUserId, mockMealId, mockUpdateMealReq);
    expect(mealRepository.findOne).toHaveBeenCalledWith({
      where: { id: mockMealId, user: { id: mockUserId } },
    });
  });

  it('should delete an meal by id', async () => {
    mealRepository.delete.mockResolvedValue({});

    const result = await mealService.remove(mockUserId, mockMealId);
    expect(mealRepository.delete).toHaveBeenCalledWith({
      id: mockMealId,
      user: { id: mockUserId },
    });
    expect(result.success).toBe(true);
  });
});
