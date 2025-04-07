import { Test, TestingModule } from '@nestjs/testing';
import { UnviversityEmploymentService } from './unviversity-employment.service';

describe('UnviversityEmploymentService', () => {
  let service: UnviversityEmploymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnviversityEmploymentService],
    }).compile();

    service = module.get<UnviversityEmploymentService>(UnviversityEmploymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
