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
  Request,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GenericApiResponse } from '@/common/dtos';
import { RecipeResponseDto } from './dtos/response-recipe.dto';
import { RecipeListResponseDto } from './dtos/response-recipe-list.dto';
import { PaginatedDto } from '@/common/dtos/api-paginated.dto';
import { AuthenticatedRequest } from '../auth/jwt.strategy';

@ApiTags('Default')
@Controller('recipe')
@ApiExtraModels(PaginatedDto)
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
    @Request() req: AuthenticatedRequest,
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<GenericApiResponse<RecipeResponseDto>> {
    this.logger.log('create recipes');
    return this.recipeService.create(req.user.id, createRecipeDto);
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiOperation({ operationId: 'getRecipes', summary: 'Get recipes' })
  @ApiResponse({
    status: 200,
    description: 'Get recipes',
    type: RecipeListResponseDto,
  })
  getRecipes(
    @Request() req: AuthenticatedRequest,
    @Query('name') name?: string,
    @Query('page') page?: string,
  ): Promise<GenericApiResponse<RecipeListResponseDto>> {
    this.logger.log('find by recipe name');
    return this.recipeService.getAll(req.user.id, name, page);
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
    @Request() req: AuthenticatedRequest,
    @Param(':id') id: string,
  ): Promise<GenericApiResponse<RecipeResponseDto>> {
    this.logger.log('find by recipe id');
    return this.recipeService.getDetails(req.user.id, id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ operationId: 'updateRecipe', summary: 'Update recipe' })
  @ApiResponse({ status: 204, description: 'Recipe updated.' })
  updateRecipe(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    this.logger.log('update recipe');
    return this.recipeService.update(req.user.id, id, updateRecipeDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ operationId: 'removeRecipe', summary: 'Remove recipe' })
  @ApiResponse({ status: 204, description: 'Recipe removed.' })
  removeRecipe(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    this.logger.log('remove recipe');
    return this.recipeService.remove(req.user.id, id);
  }
}
