import { Test, TestingModule } from '@nestjs/testing';
import { RecipeService } from './recipe.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Like } from 'typeorm';

const mockRecipes: Recipe[] = [
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

const mockRecipe: Recipe = mockRecipes[0];

describe('RecipeService', () => {
  let recipeService: RecipeService;
  let recipeRepository: Record<string, jest.Mock>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    recipeService = module.get<RecipeService>(RecipeService);
    recipeRepository = module.get(getRepositoryToken(Recipe));
  });

  it('should be defined', () => {
    expect(recipeService).toBeDefined();
  });

  it('should find ingredients by name', async () => {
    recipeRepository.find.mockResolvedValue(mockRecipes);

    const result = await recipeService.findAll('trung');
    expect(recipeRepository.find).toHaveBeenCalledWith({
      where: { name: Like('trung%') },
    });
    expect(result.data).toEqual(mockRecipes);
  });

  it('should update ingredient by id', async () => {
    recipeRepository.findOne.mockResolvedValue(mockRecipe);

    const result = await recipeService.update('1', { name: 'trung luoc' });
    expect(recipeRepository.findOne).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(recipeRepository.save).toHaveBeenCalledWith({
      ...mockRecipe,
      name: 'trung luoc',
    });
    expect(result.success).toBe(true);
  });

  it('should delete an ingredient by id', async () => {
    recipeRepository.delete.mockResolvedValue({});

    const result = await recipeService.remove('1');
    expect(recipeRepository.delete).toHaveBeenCalledWith('1');
    expect(result.success).toBe(true);
  });
});
