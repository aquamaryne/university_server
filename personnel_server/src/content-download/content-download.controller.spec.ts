import { Test, TestingModule } from '@nestjs/testing';
import { ContentDownloadController } from './content-download.controller';
import { ContentDownloadService } from './content-download.service';

describe('ContentDownloadController', () => {
  let controller: ContentDownloadController;
  let service: ContentDownloadService;

  beforeEach(async () => {
    const mockContentDownloadService = {
      generatePdf: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentDownloadController],
      providers: [
        {
          provide: ContentDownloadService,
          useValue: mockContentDownloadService,
        }
      ]
    }).compile();

    controller = module.get<ContentDownloadController>(ContentDownloadController);
    service = module.get<ContentDownloadService>(ContentDownloadService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
