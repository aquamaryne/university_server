import { Test, TestingModule } from '@nestjs/testing';
import { EmployeersController } from './employeers.controller';

describe('EmployeersController', () => {
  let controller: EmployeersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeersController],
    }).compile();

    controller = module.get<EmployeersController>(EmployeersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
