import { Test, TestingModule } from '@nestjs/testing';
import { EnterFormController } from './enter-form.controller';

describe('EnterFormController', () => {
  let controller: EnterFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnterFormController],
    }).compile();

    controller = module.get<EnterFormController>(EnterFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
