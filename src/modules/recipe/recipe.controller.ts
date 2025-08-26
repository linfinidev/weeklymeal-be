import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GenericApiResponse } from '@/common/dtos';
import { RecipeResponseDto } from './dto/response-recipe.dto';

@ApiTags('Default')
@Controller('recipe')
export class RecipeController {
  private readonly logger = new Logger(RecipeService.name);
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @ApiOperation({ operationId: 'createRecipe', summary: 'Create recipe' })
  @ApiResponse({
    status: 201,
    description: 'Recipe created',
    type: RecipeResponseDto,
  })
  createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<GenericApiResponse<RecipeResponseDto>> {
    this.logger.log('create recipes');
    return this.recipeService.create(createRecipeDto);
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiOperation({ operationId: 'getRecipes', summary: 'Get recipes' })
  @ApiResponse({
    status: 200,
    description: 'Get recipes',
    type: [RecipeResponseDto],
  })
  getRecipes(
    @Query('name') name?: string,
  ): Promise<GenericApiResponse<Array<RecipeResponseDto>>> {
    this.logger.log('find by recipe name');
    return this.recipeService.getAll(name);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({
    operationId: 'getRecipeDetails',
    summary: 'Get recipe by Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Get recipe by Id',
    type: RecipeResponseDto,
  })
  getRecipeDetails(
    @Param(':id') id: string,
  ): Promise<GenericApiResponse<RecipeResponseDto>> {
    this.logger.log('find by recipe id');
    return this.recipeService.getDetails(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ operationId: 'updateRecipe', summary: 'Update recipe' })
  @ApiResponse({ status: 204, description: 'Recipe updated.' })
  updateRecipe(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    this.logger.log('update recipe');
    return this.recipeService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ operationId: 'removeRecipe', summary: 'Remove recipe' })
  @ApiResponse({ status: 204, description: 'Recipe removed.' })
  removeRecipe(@Param('id') id: string) {
    this.logger.log('remove recipe');
    return this.recipeService.remove(id);
  }
}
