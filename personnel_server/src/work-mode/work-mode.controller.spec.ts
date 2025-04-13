import { Test, TestingModule } from '@nestjs/testing';
import { WorkModeController } from './work-mode.controller';

describe('WorkModeController', () => {
  let controller: WorkModeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkModeController],
    }).compile();

    controller = module.get<WorkModeController>(WorkModeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
