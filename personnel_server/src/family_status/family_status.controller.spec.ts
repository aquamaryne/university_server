import { Test, TestingModule } from '@nestjs/testing';
import { FamilyStatusController } from './family_status.controller';

describe('FamilyStatusController', () => {
  let controller: FamilyStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyStatusController],
    }).compile();

    controller = module.get<FamilyStatusController>(FamilyStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
