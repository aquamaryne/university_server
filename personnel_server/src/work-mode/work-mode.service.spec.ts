import { Test, TestingModule } from '@nestjs/testing';
import { WorkModeService } from './work-mode.service';

describe('WorkModeService', () => {
  let service: WorkModeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkModeService],
    }).compile();

    service = module.get<WorkModeService>(WorkModeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
