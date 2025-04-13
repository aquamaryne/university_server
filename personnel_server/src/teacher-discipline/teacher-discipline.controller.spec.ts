import { Test, TestingModule } from '@nestjs/testing';
import { TeacherDisciplineController } from './teacher-discipline.controller';

describe('TeacherDisciplineController', () => {
  let controller: TeacherDisciplineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherDisciplineController],
    }).compile();

    controller = module.get<TeacherDisciplineController>(TeacherDisciplineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
