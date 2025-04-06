import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeAchievementService } from './employee-achievement.service';

describe('EmployeeAchievementService', () => {
  let service: EmployeeAchievementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeAchievementService],
    }).compile();

    service = module.get<EmployeeAchievementService>(EmployeeAchievementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
