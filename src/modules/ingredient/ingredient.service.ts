import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  create(createIngredientDto: CreateIngredientDto) {
    const ingredient = this.ingredientRepository.create(createIngredientDto);
    return this.ingredientRepository.save(ingredient);
  }

  findAll() {
    return `This action returns all Ingredient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Ingredient`;
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return `This action updates a #${id} Ingredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} Ingredient`;
  }
}
