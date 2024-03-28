import { Test, TestingModule } from '@nestjs/testing';
import { FiredService } from './fired.service';

describe('FiredService', () => {
  let service: FiredService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FiredService],
    }).compile();

    service = module.get<FiredService>(FiredService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
