import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
  Request,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dtos/create-meal.dto';
import { UpdateMealDto } from './dtos/update-meal.dto';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MealResponseDto } from './dtos/response-meal.dto';
import { GenericApiResponse } from '@/common/dtos';
import { MealListItemResponseDto } from './dtos/response-meal-list-item.dto';
import { UserResponseDto } from '../user/dtos/response-user.dto';
import { AuthenticatedRequest } from '../auth/jwt.strategy';

@ApiTags('Default')
@Controller('meal')
export class MealController {
  private readonly logger = new Logger(MealService.name);
  constructor(private readonly mealService: MealService) {}

  @Post()
  @ApiOperation({ operationId: 'createMeal', summary: 'Create meal' })
  @ApiResponse({
    status: 201,
    description: 'Meal created',
    type: MealResponseDto,
  })
  createMeal(
    @Request() req: AuthenticatedRequest,
    @Body() createMealDto: CreateMealDto,
  ): Promise<GenericApiResponse<MealResponseDto>> {
    this.logger.log('create meal');
    return this.mealService.create(req.user.id, createMealDto);
  }

  @Get()
  @ApiQuery({ name: 'startDate', required: true })
  @ApiQuery({ name: 'endDate', required: true })
  @ApiOperation({ operationId: 'getMeals', summary: 'Get meals' })
  @ApiResponse({
    status: 200,
    description: 'Get meals',
    type: [MealListItemResponseDto],
  })
  getMeals(
    @Request() req: AuthenticatedRequest,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<GenericApiResponse<Array<MealListItemResponseDto>>> {
    this.logger.log('find meals between start date and end date');
    return this.mealService.getAll(req.user.id, startDate, endDate);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ operationId: 'getMealDetails', summary: 'Get meal details' })
  @ApiResponse({
    status: 200,
    description: 'Get meal details',
    type: MealResponseDto,
  })
  getMealDetails(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ): Promise<GenericApiResponse<MealResponseDto>> {
    this.logger.log('get meal details');
    return this.mealService.getDetails(req.user.id, id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ operationId: 'updateMeal', summary: 'Update meal' })
  @ApiResponse({ status: 204, description: 'Meal updated.' })
  updateMeal(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateMealDto: UpdateMealDto,
  ) {
    this.logger.log('update meal details');
    return this.mealService.update(req.user.id, id, updateMealDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ operationId: 'removeMeal', summary: 'Remove meal' })
  @ApiResponse({ status: 204, description: 'Meal removed.' })
  removeMeal(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    this.logger.log('delete meal');
    return this.mealService.remove(req.user.id, id);
  }
}
