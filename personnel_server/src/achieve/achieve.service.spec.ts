import { Test, TestingModule } from '@nestjs/testing';
import { AchieveService } from './achieve.service';

describe('AchieveService', () => {
  let service: AchieveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AchieveService],
    }).compile();

    service = module.get<AchieveService>(AchieveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
