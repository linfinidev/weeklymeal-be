import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { successResponse } from '@/common/utils';
import { API_SUCCESS_MSG } from '@/common/constants/messages';
import {
  mockRecipeId,
  mockCreateRecipeReq,
  mockUpdateRecipeReq,
  mockRecipeRes,
  mockPaginatedRecipesRes,
} from './recipe.mock';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { mockUserResponse } from '../user/user.mock';

describe('RecipeController', () => {
  let recipeController: RecipeController;
  let recipeService: RecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        RecipeService,
        {
          provide: getRepositoryToken(Recipe),
          useValue: {
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
      ],
    }).compile();

    recipeController = module.get<RecipeController>(RecipeController);
    recipeService = module.get(RecipeService);
  });

  it('should be defined', () => {
    expect(recipeController).toBeDefined();
  });

  it('getAll', async () => {
    jest
      .spyOn(recipeService, 'getAll')
      .mockImplementation(() =>
        Promise.resolve(
          successResponse(API_SUCCESS_MSG, mockPaginatedRecipesRes),
        ),
      );
    const response = await recipeController.getRecipes(mockUserResponse, '');
    expect(response).toEqual(
      successResponse(API_SUCCESS_MSG, mockPaginatedRecipesRes),
    );
  });

  it('getDetails', async () => {
    jest
      .spyOn(recipeService, 'getDetails')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG, mockRecipeRes)),
      );
    const response = await recipeController.getRecipeDetails(
      mockUserResponse,
      mockRecipeId,
    );
    expect(response).toEqual(successResponse(API_SUCCESS_MSG, mockRecipeRes));
  });

  it('create', async () => {
    jest
      .spyOn(recipeService, 'create')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await recipeController.createRecipe(
      mockUserResponse,
      mockCreateRecipeReq,
    );
    expect(response.success).toBeTruthy();
  });

  it('update', async () => {
    jest
      .spyOn(recipeService, 'update')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await recipeController.updateRecipe(
      mockUserResponse,
      mockRecipeId,
      mockUpdateRecipeReq,
    );
    expect(response.success).toBeTruthy();
  });

  it('remove', async () => {
    jest
      .spyOn(recipeService, 'remove')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await recipeController.removeRecipe(
      mockUserResponse,
      mockRecipeId,
    );
    expect(response.success).toBeTruthy();
  });
});
