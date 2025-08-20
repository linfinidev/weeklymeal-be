import { Test, TestingModule } from '@nestjs/testing';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { successResponse } from '@/common/utils/api-response.util';
import { API_SUCCESS_MSG } from '@/lib/messages';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

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

  it('findAll', async () => {
    const result: Ingredient[] = [{ id: '1', name: 'ca chua' }];
    jest
      .spyOn(ingredientService, 'findAll')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG, result)),
      );
    const response = await ingredientController.findAll('');
    expect(response).toEqual(successResponse(API_SUCCESS_MSG, result));
  });

  it('create', async () => {
    const req: CreateIngredientDto = { name: 'ca chua' };
    jest
      .spyOn(ingredientService, 'create')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await ingredientController.create(req);
    expect(response.success).toBeTruthy();
  });

  it('update', async () => {
    const req: UpdateIngredientDto = { name: 'ca tim' };
    const id = '1';
    jest
      .spyOn(ingredientService, 'update')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await ingredientController.update(id, req);
    expect(response.success).toBeTruthy();
  });

  it('remove', async () => {
    const id = '1';
    jest
      .spyOn(ingredientService, 'remove')
      .mockImplementation(() =>
        Promise.resolve(successResponse(API_SUCCESS_MSG)),
      );
    const response = await ingredientController.remove(id);
    expect(response.success).toBeTruthy();
  });
});
