import { Test, TestingModule } from '@nestjs/testing';
import { UnviversityEmploymentController } from './unviversity-employment.controller';

describe('UnviversityEmploymentController', () => {
  let controller: UnviversityEmploymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnviversityEmploymentController],
    }).compile();

    controller = module.get<UnviversityEmploymentController>(UnviversityEmploymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
