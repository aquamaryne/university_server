import { Module } from '@nestjs/common';
import { UnviversityEmploymentService } from './unviversity-employment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversityEmployment } from '../entity/university-employment';
import { UnviversityEmploymentController } from './unviversity-employment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UniversityEmployment])
  ],
  controllers: [UnviversityEmploymentController],
  providers: [UnviversityEmploymentService]
})
export class UnviversityEmploymentModule {}
