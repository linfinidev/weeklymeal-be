import { Test, TestingModule } from '@nestjs/testing';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './entities/ingredient.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Like } from 'typeorm';

const mockIngredients: Ingredient[] = [{ id: '1', name: 'tomato' }];
const mockIngredient: Ingredient = mockIngredients[0];
const mockIngredientId = '1';

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
            findOneBy: jest.fn(),
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
    ingredientRepository.find.mockResolvedValue(mockIngredients);

    await ingredientService.getAll('Tom');
    expect(ingredientRepository.find).toHaveBeenCalledWith({
      where: { name: Like('Tom%') },
    });
  });

  it('should update ingredient by id', async () => {
    ingredientRepository.findOneBy.mockResolvedValue(mockIngredient);

    await ingredientService.update(mockIngredientId, {
      name: 'Cherry Tomato',
    });
    expect(ingredientRepository.findOneBy).toHaveBeenCalledWith({
      id: mockIngredientId,
    });
    expect(ingredientRepository.save).toHaveBeenCalledWith({
      ...mockIngredient,
      name: 'Cherry Tomato',
    });
  });

  it('should delete an ingredient by id', async () => {
    ingredientRepository.delete.mockResolvedValue({});

    const result = await ingredientService.remove(mockIngredientId);
    expect(ingredientRepository.delete).toHaveBeenCalledWith(mockIngredientId);
    expect(result.success).toBe(true);
  });
});
