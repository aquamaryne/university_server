import { Test, TestingModule } from '@nestjs/testing';
import { MilitaryAppearanceController } from './military_appearance.controller';

describe('MilitaryAppearanceController', () => {
  let controller: MilitaryAppearanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MilitaryAppearanceController],
    }).compile();

    controller = module.get<MilitaryAppearanceController>(MilitaryAppearanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
