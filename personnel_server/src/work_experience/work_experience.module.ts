import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkExperience } from 'src/entity/work-experience';
import { WorkExperienceService } from './work_experience.service';
import { WorkExperienceController } from './work_experience.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([WorkExperience])
    ],
    providers: [WorkExperienceService],
    controllers: [WorkExperienceController],
})
export class WorkExperienceModule {}
