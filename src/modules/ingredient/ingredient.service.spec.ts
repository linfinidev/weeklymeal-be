import { Test, TestingModule } from '@nestjs/testing';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './entities/ingredient.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Like } from 'typeorm';

describe('IngredientService', () => {
  let ingredientService: IngredientService;
  let ingredientRepository: Record<string, jest.Mock>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    ingredientService = module.get(IngredientService);
    ingredientRepository = module.get(getRepositoryToken(Ingredient));
  });

  it('should be defined', () => {
    expect(ingredientService).toBeDefined();
  });

  it('should find ingredients by name', async () => {
    const mockIngredients: Ingredient[] = [{ id: '1', name: 'Tomato' }];
    ingredientRepository.find.mockResolvedValue(mockIngredients);

    const result = await ingredientService.findAll('Tom');
    expect(ingredientRepository.find).toHaveBeenCalledWith({
      where: { name: Like('Tom%') },
    });
    expect(result.data).toEqual(mockIngredients);
  });

  it('should update ingredient by id', async () => {
    const mockIngredient: Ingredient = { id: '1', name: 'Tomato' };
    ingredientRepository.findOne.mockResolvedValue(mockIngredient);

    const result = await ingredientService.update('1', { name: 'ca chua' });
    expect(ingredientRepository.findOne).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(ingredientRepository.save).toHaveBeenCalledWith({
      ...mockIngredient,
      name: 'ca chua',
    });
    expect(result.success).toBe(true);
  });

  it('should delete an ingredient by id', async () => {
    ingredientRepository.delete.mockResolvedValue({});

    const result = await ingredientService.remove('1');
    expect(ingredientRepository.delete).toHaveBeenCalledWith('1');
    expect(result.success).toBe(true);
  });
});
