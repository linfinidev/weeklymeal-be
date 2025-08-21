import { PartialType } from '@nestjs/swagger';
import { CreateFridgeDto } from './create-fridge.dto';

export class UpdateFridgeDto extends PartialType(CreateFridgeDto) {}
