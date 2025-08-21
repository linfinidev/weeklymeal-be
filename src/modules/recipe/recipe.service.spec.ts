import { Test, TestingModule } from '@nestjs/testing';
import { RecipeService } from './recipe.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Like } from 'typeorm';

const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'tomato soup',
    content: '- Dice tomato\n- Crack 2 eggs',
    img_url: 'imgSrc',
    ingredients: [
      {
        id: '1',
        name: 'tomato',
      },
    ],
  },
];
const mockRecipe: Recipe = mockRecipes[0];
const mockRecipeId = '1';

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
            findOneBy: jest.fn(),
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

  it('should find recipes by name', async () => {
    recipeRepository.find.mockResolvedValue(mockRecipes);

    await recipeService.getAll('egg');
    expect(recipeRepository.find).toHaveBeenCalledWith({
      where: { name: Like('egg%') },
    });
  });

  it('should find recipe by id', async () => {
    recipeRepository.findOneBy.mockResolvedValue(mockRecipe);

    await recipeService.getDetails(mockRecipeId);
    expect(recipeRepository.findOneBy).toHaveBeenCalledWith({
      id: mockRecipeId,
    });
  });

  it('should update recipe by id', async () => {
    recipeRepository.findOneBy.mockResolvedValue(mockRecipe);

    await recipeService.update(mockRecipeId, { content: '' });
    expect(recipeRepository.findOneBy).toHaveBeenCalledWith({
      id: mockRecipeId,
    });
    expect(recipeRepository.save).toHaveBeenCalledWith({
      ...mockRecipe,
      content: '',
    });
  });

  it('should delete an recipe by id', async () => {
    recipeRepository.delete.mockResolvedValue({});

    const result = await recipeService.remove(mockRecipeId);
    expect(recipeRepository.delete).toHaveBeenCalledWith(mockRecipeId);
    expect(result.success).toBe(true);
  });
});
