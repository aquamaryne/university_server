import { Test, TestingModule } from '@nestjs/testing';
import { ContentDownloadController } from './content-download.controller';

describe('ContentDownloadController', () => {
  let controller: ContentDownloadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentDownloadController],
    }).compile();

    controller = module.get<ContentDownloadController>(ContentDownloadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
