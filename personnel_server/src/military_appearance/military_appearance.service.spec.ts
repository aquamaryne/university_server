import { Test, TestingModule } from '@nestjs/testing';
import { MilitaryAppearanceService } from './military_appearance.service';

describe('MilitaryAppearanceService', () => {
  let service: MilitaryAppearanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MilitaryAppearanceService],
    }).compile();

    service = module.get<MilitaryAppearanceService>(MilitaryAppearanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
