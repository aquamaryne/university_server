import { Test, TestingModule } from '@nestjs/testing';
import { AchieveController } from './achieve.controller';

describe('AchieveController', () => {
  let controller: AchieveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AchieveController],
    }).compile();

    controller = module.get<AchieveController>(AchieveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
