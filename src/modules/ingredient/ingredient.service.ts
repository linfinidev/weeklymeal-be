import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { UpdateIngredientDto } from './dtos/update-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { ILike, Repository } from 'typeorm';
import { throwErrorResponse, successResponse } from '@/common/utils';
import { API_SUCCESS_MSG } from '@/common/constants/messages';
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
    const ingredient = this.ingredientRepository.create({
      ...createIngredientDto,
      user: { id: userId } as User,
    });
    await this.ingredientRepository.save(ingredient);
    const res = plainToInstance(IngredientResponseDto, ingredient, {
      excludeExtraneousValues: true,
    });
    return successResponse(API_SUCCESS_MSG, res);
  }

  async getAll(userId: string, ingredientName?: string) {
    const ingredients = await this.ingredientRepository.find({
      where: { name: ILike(`%${ingredientName || ''}%`), user: { id: userId } },
    });
    const res = plainToInstance(IngredientResponseDto, ingredients, {
      excludeExtraneousValues: true,
    });
    return successResponse(API_SUCCESS_MSG, res);
  }

  async update(
    id: string,
    updateIngredientDto: UpdateIngredientDto,
    userId: string,
  ) {
    const ingredient = await this.ingredientRepository.findOne({
      where: { id: id, user: { id: userId } },
    });
    if (!ingredient) {
      throwErrorResponse('Ingredient not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(ingredient, updateIngredientDto);
    await this.ingredientRepository.save(ingredient);
    return successResponse(API_SUCCESS_MSG);
  }

  async remove(id: string, userId: string) {
    const result = await this.ingredientRepository.delete({
      id,
      user: { id: userId },
    });
    if (result.affected === 0) {
      throwErrorResponse('Ingredient not found', HttpStatus.NOT_FOUND);
    }
    return successResponse(API_SUCCESS_MSG);
  }
}
