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
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('ingredient')
export class IngredientController {
  private readonly logger = new Logger(IngredientService.name);
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  create(@Body() createIngredientDto: CreateIngredientDto) {
    this.logger.log('create ingredient');
    return this.ingredientService.create(createIngredientDto);
  }

  @Get()
  findAll(@Query('name') name: string) {
    this.logger.log('find by ingredient name');
    return this.ingredientService.findAll(name);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    this.logger.log('update ingredient');
    return this.ingredientService.update(id, updateIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log('remove ingredient');
    return this.ingredientService.remove(id);
  }
}
