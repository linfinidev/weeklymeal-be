import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Logger,
  Query,
  Request,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { UpdateIngredientDto } from './dtos/update-ingredient.dto';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GenericApiResponse } from '@/common/dtos';
import { IngredientResponseDto } from './dtos/response-ingredient.dto';
import { AuthenticatedRequest } from '../auth/jwt.strategy';

@ApiTags('Default')
@Controller('ingredient')
export class IngredientController {
  private readonly logger = new Logger(IngredientService.name);
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  @ApiOperation({
    operationId: 'createIngredient',
    summary: 'Create ingredient',
  })
  @ApiResponse({
    status: 201,
    description: 'Ingredient created',
    type: IngredientResponseDto,
  })
  createIngredient(
    @Request() req: AuthenticatedRequest,
    @Body() createIngredientDto: CreateIngredientDto,
  ): Promise<GenericApiResponse<IngredientResponseDto>> {
    this.logger.log('create ingredient');
    return this.ingredientService.create(createIngredientDto, req.user.id);
  }

  @Get()
  @ApiOperation({
    operationId: 'getIngredients',
    summary: 'Get ingredients',
  })
  @ApiQuery({ name: 'name', required: false })
  @ApiResponse({
    status: 200,
    description: 'Get all ingredients',
    type: [IngredientResponseDto],
  })
  getIngredients(
    @Request() req: AuthenticatedRequest,
    @Query('name') name?: string,
  ): Promise<GenericApiResponse<Array<IngredientResponseDto>>> {
    this.logger.log('find by ingredient name');
    return this.ingredientService.getAll(req.user.id, name);
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({
    operationId: 'updateIngredient',
    summary: 'Update ingredient',
  })
  @ApiResponse({ status: 204, description: 'Ingredient updated.' })
  updateIngredient(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    this.logger.log('update ingredient');
    return this.ingredientService.update(id, updateIngredientDto, req.user.id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({
    operationId: 'removeIngredient',
    summary: 'Remove ingredient',
  })
  @ApiResponse({ status: 204, description: 'Ingredient removed.' })
  removeIngredient(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    this.logger.log('remove ingredient');
    return this.ingredientService.remove(id, req.user.id);
  }
}
