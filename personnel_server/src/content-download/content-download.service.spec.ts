import { Test, TestingModule } from '@nestjs/testing';
import { ContentDownloadService } from './content-download.service';

describe('ContentDownloadService', () => {
  let service: ContentDownloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentDownloadService],
    }).compile();

    service = module.get<ContentDownloadService>(ContentDownloadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
