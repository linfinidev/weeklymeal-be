import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { successResponse } from '@/common/utils/api-response.util';
import { API_SUCCESS_MSG } from '@/lib/messages';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeResponseDto } from './dto/response-recipe.dto';

const mockRes: RecipeResponseDto[] = [
  {
    id: '1',
    name: 'tomato soup',
    content: '- Dice tomato\n- Crack 2 eggs',
    img_url: 'imgSrc',
    ingredientIds: ['1', '2'],
    createdAt: '2025/08/01',
    updatedAt: '2025/08/01',
  },
];
const mockCreateReq: CreateRecipeDto = {
  name: 'tomato soup',
  content: '- Dice tomato\n- Crack 2 eggs',
  img_url: 'imgSrc',
  ingredientIds: ['1'],
};
const mockUpdateReq: UpdateRecipeDto = {
  content: '- Dice 2 tomato\n- Crack 2 eggs',
};
const mockRecipeId = '1';

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
        Promise.resolve(successResponse(API_SUCCESS_MSG, mockRes)),
      );
    const response = await recipeController.getRecipes('');
    expect(response).toEqual(successResponse(API_SUCCESS_MSG, mockRes));
  });

  it('getDetails', async () => {
    jest
      .spyOn(recipeService, 'getDetails')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG, mockRes[0])),
      );
    const response = await recipeController.getRecipeDetails(mockRecipeId);
    expect(response).toEqual(successResponse(API_SUCCESS_MSG, mockRes[0]));
  });

  it('create', async () => {
    jest
      .spyOn(recipeService, 'create')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await recipeController.createRecipe(mockCreateReq);
    expect(response.success).toBeTruthy();
  });

  it('update', async () => {
    jest
      .spyOn(recipeService, 'update')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await recipeController.updateRecipe(
      mockRecipeId,
      mockUpdateReq,
    );
    expect(response.success).toBeTruthy();
  });

  it('remove', async () => {
    jest
      .spyOn(recipeService, 'remove')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await recipeController.removeRecipe(mockRecipeId);
    expect(response.success).toBeTruthy();
  });
});
