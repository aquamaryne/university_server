import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeAchievementController } from './employee-achievement.controller';

describe('EmployeeAchievementController', () => {
  let controller: EmployeeAchievementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeAchievementController],
    }).compile();

    controller = module.get<EmployeeAchievementController>(EmployeeAchievementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
