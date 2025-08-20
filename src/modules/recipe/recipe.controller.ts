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

@Controller('recipe')
export class RecipeController {
  private readonly logger = new Logger(RecipeService.name);
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    this.logger.log('create recipes');
    return this.recipeService.create(createRecipeDto);
  }

  @Get()
  findAll(@Query('name') name: string) {
    this.logger.log('find by recipe name');
    return this.recipeService.findAll(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    this.logger.log('update recipe');
    return this.recipeService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log('remove recipe');
    return this.recipeService.remove(id);
  }
}
