import { Test, TestingModule } from '@nestjs/testing';
import { TeacherDisciplineService } from './teacher-discipline.service';

describe('TeacherDisciplineService', () => {
  let service: TeacherDisciplineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherDisciplineService],
    }).compile();

    service = module.get<TeacherDisciplineService>(TeacherDisciplineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
