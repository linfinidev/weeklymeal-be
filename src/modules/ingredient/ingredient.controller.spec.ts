import { Test, TestingModule } from '@nestjs/testing';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { successResponse } from '@/common/utils/api-response.util';
import { API_SUCCESS_MSG } from '@/lib/messages';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { IngredientResponseDto } from './dto/response-ingredient.dto';

const mockRes: IngredientResponseDto[] = [
  {
    id: '1',
    name: 'tomato',
    createdAt: '2025/08/01',
    updatedAt: '2025/08/01',
  },
];
const mockCreateReq: CreateIngredientDto = { name: 'tomato' };
const mockUpdateReq: UpdateIngredientDto = { name: 'eggs' };
const mockIngredientId = '1';

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
        Promise.resolve(successResponse(API_SUCCESS_MSG, mockRes)),
      );
    const response = await ingredientController.getIngredients('');
    expect(response).toEqual(successResponse(API_SUCCESS_MSG, mockRes));
  });

  it('create', async () => {
    jest
      .spyOn(ingredientService, 'create')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await ingredientController.createIngredient(mockCreateReq);
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
      mockUpdateReq,
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
