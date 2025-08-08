import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Like, Repository } from 'typeorm';
import {
  errorResponse,
  successResponse,
} from '@/common/utils/api-response.util';
import { API_FAIL_MSG, API_SUCCESS_MSG } from '@/lib/messages';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto) {
    try {
      const ingredient = this.ingredientRepository.create(createIngredientDto);
      await this.ingredientRepository.save(ingredient);
      return successResponse(API_SUCCESS_MSG);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async findAll(ingredientName: string) {
    try {
      const ingredients = await this.ingredientRepository.find({
        where: { name: Like(`${ingredientName}%`) },
      });
      return successResponse(API_SUCCESS_MSG, ingredients);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    try {
      const ingredient = await this.ingredientRepository.findOne({
        where: { id: id },
      });
      Object.assign(ingredient, updateIngredientDto);
      await this.ingredientRepository.save(ingredient);
      return successResponse(API_SUCCESS_MSG);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async remove(id: string) {
    try {
      await this.ingredientRepository.delete(id);
      return successResponse(API_SUCCESS_MSG);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }
}
