import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WorkExperienceService } from './work_experience.service';
import { WorkExperience } from 'src/entity/work-experience';

@Controller('work-experience')
export class WorkExperienceController {
    constructor(private readonly workExperienceService: WorkExperienceService) {}

    @Get()
    findAll(): Promise<WorkExperience[]>{
        return this.workExperienceService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<WorkExperience>{
        return this.workExperienceService.findOne(Number(id));
    }

    @Post()
    create(@Body() workExperience: Partial<WorkExperience>): Promise<WorkExperience>{
        return this.workExperienceService.create(workExperience);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() workExperience: Partial<WorkExperience>): Promise<WorkExperience>{
        return this.workExperienceService.update(Number(id), workExperience);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.workExperienceService.remove(Number(id));
    }
}
