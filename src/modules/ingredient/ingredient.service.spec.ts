import { Test, TestingModule } from '@nestjs/testing';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './entities/ingredient.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import {
  mockIngredients,
  mockIngredient,
  mockIngredientId,
} from './ingredient.mock';
import { mockUserId } from '../user/user.mock';

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
    ingredientRepository.find.mockResolvedValue(mockIngredients);

    await ingredientService.getAll(mockUserId, 'Tom');
    expect(ingredientRepository.find).toHaveBeenCalledWith({
      where: { name: Like('Tom%'), user: { id: mockUserId } },
    });
  });

  it('should update ingredient by id', async () => {
    ingredientRepository.findOne.mockResolvedValue(mockIngredient);

    await ingredientService.update(
      mockIngredientId,
      {
        name: 'Cherry Tomato',
      },
      mockUserId,
    );
    expect(ingredientRepository.findOne).toHaveBeenCalledWith({
      where: { id: mockIngredientId, user: { id: mockUserId } },
    });
    expect(ingredientRepository.save).toHaveBeenCalledWith({
      ...mockIngredient,
      name: 'Cherry Tomato',
    });
  });

  it('should delete an ingredient by id', async () => {
    ingredientRepository.delete.mockResolvedValue({});

    const result = await ingredientService.remove(mockIngredientId, mockUserId);
    expect(ingredientRepository.delete).toHaveBeenCalledWith({
      id: mockIngredientId,
      user: { id: mockUserId },
    });
    expect(result.success).toBe(true);
  });
});
