import { Test, TestingModule } from '@nestjs/testing';
import { FridgeController } from './fridge.controller';
import { FridgeService } from './fridge.service';

describe('FridgeController', () => {
  let controller: FridgeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FridgeController],
      providers: [FridgeService],
    }).compile();

    controller = module.get<FridgeController>(FridgeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
