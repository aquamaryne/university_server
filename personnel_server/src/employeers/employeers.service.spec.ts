import { Test, TestingModule } from '@nestjs/testing';
import { EmployeersService } from './employeers.service';

describe('EmployeersService', () => {
  let service: EmployeersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeersService],
    }).compile();

    service = module.get<EmployeersService>(EmployeersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
