import { Module } from '@nestjs/common';
import { TeacherDisciplineService } from './teacher-discipline.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherDiscipline } from 'src/entity/teacher-discipline';
import { TeacherDisciplineController } from './teacher-discipline.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherDiscipline]),
  ],
  providers: [TeacherDisciplineService],
  controllers: [TeacherDisciplineController],
})
export class TeacherDisciplineModule {}
