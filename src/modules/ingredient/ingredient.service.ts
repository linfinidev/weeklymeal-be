import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { UpdateIngredientDto } from './dtos/update-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Like, Repository } from 'typeorm';
import { errorResponse, successResponse } from '@/common/utils';
import { API_FAIL_MSG, API_SUCCESS_MSG } from '@/common/constants/messages';
import { plainToInstance } from 'class-transformer';
import { IngredientResponseDto } from './dtos/response-ingredient.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto, userId: string) {
    try {
      const ingredient = this.ingredientRepository.create({
        ...createIngredientDto,
        user: { id: userId } as User,
      });
      await this.ingredientRepository.save(ingredient);
      const res = plainToInstance(IngredientResponseDto, ingredient, {
        excludeExtraneousValues: true,
      });
      return successResponse(API_SUCCESS_MSG, res);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async getAll(userId: string, ingredientName?: string) {
    try {
      const ingredients = await this.ingredientRepository.find({
        where: { name: Like(`${ingredientName || ''}%`), user: { id: userId } },
      });
      const res = plainToInstance(IngredientResponseDto, ingredients, {
        excludeExtraneousValues: true,
      });
      return successResponse(API_SUCCESS_MSG, res);
    } catch {
      return errorResponse(API_FAIL_MSG);
    }
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    try {
      const ingredient = await this.ingredientRepository.findOneBy({
        id: id,
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
