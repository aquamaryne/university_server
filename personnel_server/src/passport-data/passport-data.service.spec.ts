import { Test, TestingModule } from '@nestjs/testing';
import { PassportDataService } from './passport-data.service';

describe('PassportDataService', () => {
  let service: PassportDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassportDataService],
    }).compile();

    service = module.get<PassportDataService>(PassportDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
