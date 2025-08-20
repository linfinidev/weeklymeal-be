import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { successResponse } from '@/common/utils/api-response.util';
import { API_SUCCESS_MSG } from '@/lib/messages';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

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

  it('findAll', async () => {
    const result: Recipe[] = [
      {
        id: '1',
        name: 'trung chien',
        content: '',
        img_url: '',
        ingredients: [
          {
            id: '1',
            name: 'ingredient1',
          },
        ],
      },
    ];
    jest
      .spyOn(recipeService, 'findAll')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG, result)),
      );
    const response = await recipeController.findAll('');
    expect(response).toEqual(successResponse(API_SUCCESS_MSG, result));
  });

  it('create', async () => {
    const req: CreateRecipeDto = {
      name: 'trung chien',
      content: 'dap trung vo chao, chien',
      img_url: '',
      ingredientIds: ['1'],
    };
    jest
      .spyOn(recipeService, 'create')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await recipeController.create(req);
    expect(response.success).toBeTruthy();
  });

  it('update', async () => {
    const req: UpdateRecipeDto = {
      name: 'trung chien long dao',
      content: 'dap trung vo chao, chien lua nho 3 phut',
    };
    const id = '1';
    jest
      .spyOn(recipeService, 'update')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await recipeController.update(id, req);
    expect(response.success).toBeTruthy();
  });

  it('remove', async () => {
    const id = '1';
    jest
      .spyOn(recipeService, 'remove')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await recipeController.remove(id);
    expect(response.success).toBeTruthy();
  });
});
