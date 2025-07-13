import { Module } from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { GroceryController } from './grocery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grocery } from './entities/grocery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grocery])],
  controllers: [GroceryController],
  providers: [GroceryService],
  exports: [TypeOrmModule],
})
export class GroceryModule {}
