import { Test, TestingModule } from '@nestjs/testing';
import { PassportDataController } from './passport-data.controller';

describe('PassportDataController', () => {
  let controller: PassportDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassportDataController],
    }).compile();

    controller = module.get<PassportDataController>(PassportDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
