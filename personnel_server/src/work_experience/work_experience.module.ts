import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work_Experience } from 'src/entity/workExperience';
import { WorkExperienceService } from './work_experience.service';
import { WorkExperienceController } from './work_experience.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Work_Experience])
    ],
    providers: [WorkExperienceService],
    controllers: [WorkExperienceController],
})
export class WorkExperienceModule {}
