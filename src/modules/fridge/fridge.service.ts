import { Injectable } from '@nestjs/common';
import { CreateFridgeDto } from './dto/create-fridge.dto';
import { UpdateFridgeDto } from './dto/update-fridge.dto';

@Injectable()
export class FridgeService {
  create(createFridgeDto: CreateFridgeDto) {
    return 'This action adds a new fridge';
  }

  findAll() {
    return `This action returns all fridge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fridge`;
  }

  update(id: number, updateFridgeDto: UpdateFridgeDto) {
    return `This action updates a #${id} fridge`;
  }

  remove(id: number) {
    return `This action removes a #${id} fridge`;
  }
}
