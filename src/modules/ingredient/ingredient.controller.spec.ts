import { Test, TestingModule } from '@nestjs/testing';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { successResponse } from '@/common/utils';
import { API_SUCCESS_MSG } from '@/common/constants/messages';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import {
  mockCreateIngredientReq,
  mockIngredientsRes,
  mockUpdateIngredientReq,
} from './ingredient.mock';
import { mockIngredientId } from './ingredient.mock';

describe('IngredientController', () => {
  let ingredientController: IngredientController;
  let ingredientService: IngredientService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [IngredientController],
      providers: [
        IngredientService,
        {
          provide: getRepositoryToken(Ingredient),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    ingredientService = moduleRef.get<IngredientService>(IngredientService);
    ingredientController =
      moduleRef.get<IngredientController>(IngredientController);
  });

  it('should be defined', () => {
    expect(ingredientController).toBeDefined();
  });

  it('getAll', async () => {
    jest
      .spyOn(ingredientService, 'getAll')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG, mockIngredientsRes)),
      );
    const response = await ingredientController.getIngredients('');
    expect(response).toEqual(
      successResponse(API_SUCCESS_MSG, mockIngredientsRes),
    );
  });

  it('create', async () => {
    jest
      .spyOn(ingredientService, 'create')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await ingredientController.createIngredient(
      mockCreateIngredientReq,
    );
    expect(response.success).toBeTruthy();
  });

  it('update', async () => {
    jest
      .spyOn(ingredientService, 'update')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await ingredientController.updateIngredient(
      mockIngredientId,
      mockUpdateIngredientReq,
    );
    expect(response.success).toBeTruthy();
  });

  it('remove', async () => {
    jest
      .spyOn(ingredientService, 'remove')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response =
      await ingredientController.removeIngredient(mockIngredientId);
    expect(response.success).toBeTruthy();
  });
});
