import { Test, TestingModule } from '@nestjs/testing';
import { FiredController } from './fired.controller';

describe('FiredController', () => {
  let controller: FiredController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FiredController],
    }).compile();

    controller = module.get<FiredController>(FiredController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
