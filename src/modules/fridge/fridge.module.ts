import { Module } from '@nestjs/common';
import { FridgeService } from './fridge.service';
import { FridgeController } from './fridge.controller';
import { Fridge } from './entities/fridge.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Fridge])],
  controllers: [FridgeController],
  providers: [FridgeService],
  exports: [TypeOrmModule],
})
export class FridgeModule {}
