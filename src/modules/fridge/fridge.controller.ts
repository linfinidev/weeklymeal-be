import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FridgeService } from './fridge.service';
import { CreateFridgeDto } from './dto/create-fridge.dto';
import { UpdateFridgeDto } from './dto/update-fridge.dto';

@Controller('fridge')
export class FridgeController {
  constructor(private readonly fridgeService: FridgeService) {}

  @Post()
  create(@Body() createFridgeDto: CreateFridgeDto) {
    return this.fridgeService.create(createFridgeDto);
  }

  @Get()
  findAll() {
    return this.fridgeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fridgeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFridgeDto: UpdateFridgeDto) {
    return this.fridgeService.update(+id, updateFridgeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fridgeService.remove(+id);
  }
}
