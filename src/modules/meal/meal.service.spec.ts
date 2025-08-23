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
            findOneBy: jest.fn(),
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

    await mealService.getAll(startDate, endDate);
    expect(mealRepository.find).toHaveBeenCalledWith({
      where: { date: Between(new Date(startDate), new Date(endDate)) },
      relations: ['recipes', 'recipes.ingredients'],
    });
  });

  it('should find meal by id', async () => {
    mealRepository.findOneBy.mockResolvedValue(mockMeal);

    await mealService.getDetails(mockMealId);
    expect(mealRepository.findOneBy).toHaveBeenCalledWith({
      id: mockMealId,
    });
  });

  it('should update meal by id', async () => {
    mealRepository.findOneBy.mockResolvedValue(mockMeal);

    await mealService.update(mockMealId, mockUpdateMealReq);
    expect(mealRepository.findOneBy).toHaveBeenCalledWith({
      id: mockMealId,
    });
  });

  it('should delete an meal by id', async () => {
    mealRepository.delete.mockResolvedValue({});

    const result = await mealService.remove(mockMealId);
    expect(mealRepository.delete).toHaveBeenCalledWith(mockMealId);
    expect(result.success).toBe(true);
  });
});
