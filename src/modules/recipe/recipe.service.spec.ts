import { Test, TestingModule } from '@nestjs/testing';
import { RecipeService } from './recipe.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { DataSource, ILike } from 'typeorm';
import {
  mockRecipes,
  mockRecipe,
  mockRecipeId,
  mockUpdateRecipeReq,
} from './recipe.mock';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { mockUserId } from '../user/user.mock';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock;
};

export const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(
  () => ({
    createQueryRunner: jest.fn().mockImplementation(() => ({
      connect: jest.fn(),
      startTransaction: jest.fn(),
      release: jest.fn(),
      rolbackTransaction: jest.fn(),
      transaction: jest.fn(),
      manager: {
        save: jest.fn(),
        findOneBy: jest.fn(),
        create: jest.fn(),
      },
    })),
  }),
);

describe('RecipeService', () => {
  let recipeService: RecipeService;
  let recipeRepository: Record<string, jest.Mock>;
  let datasource: MockType<DataSource>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: getRepositoryToken(Recipe),
          useValue: {
            findAndCount: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Ingredient),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: DataSource,
          useFactory: dataSourceMockFactory,
          useValue: {
            transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    recipeService = module.get<RecipeService>(RecipeService);
    recipeRepository = module.get(getRepositoryToken(Recipe));
    datasource = module.get(DataSource);
  });

  it('should do something', () => {
    expect(datasource).toBeDefined();
  });

  it('should be defined', () => {
    expect(recipeService).toBeDefined();
  });

  it('should find recipes by name', async () => {
    recipeRepository.findAndCount.mockResolvedValue(mockRecipes);

    await recipeService.getAll(mockUserId, 'egg');
    expect(recipeRepository.findAndCount).toHaveBeenCalledWith({
      where: { name: ILike('%egg%'), user: { id: mockUserId } },
      relations: ['recipeIngredients'],
      skip: 0,
      take: 30,
      order: { createdAt: 'DESC' },
    });
  });

  it('should find recipe by id', async () => {
    recipeRepository.findOne.mockResolvedValue(mockRecipe);

    await recipeService.getDetails(mockUserId, mockRecipeId);
    expect(recipeRepository.findOne).toHaveBeenCalledWith({
      where: { id: mockRecipeId, user: { id: mockUserId } },
      relations: ['recipeIngredients'],
    });
  });

  it('should update recipe by id', async () => {
    recipeRepository.findOne.mockResolvedValue(mockRecipe);

    await recipeService.update(mockUserId, mockRecipeId, mockUpdateRecipeReq);
    expect(recipeRepository.findOne).toHaveBeenCalledWith({
      where: { id: mockRecipeId, user: { id: mockUserId } },
      relations: ['recipeIngredients', 'recipeIngredients.ingredient'],
    });
  });

  it('should delete an recipe by id', async () => {
    recipeRepository.delete.mockResolvedValue({});

    const result = await recipeService.remove(mockUserId, mockRecipeId);
    expect(recipeRepository.delete).toHaveBeenCalledWith({
      id: mockRecipeId,
      user: { id: mockUserId },
    });
    expect(result.success).toBe(true);
  });
});
