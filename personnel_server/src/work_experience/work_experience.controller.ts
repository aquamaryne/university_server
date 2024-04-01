import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WorkExperienceService } from './work_experience.service';
import { Work_Experience } from 'src/entity/workExperience';

@Controller('work-experience')
export class WorkExperienceController {
    constructor(private readonly workExperienceService: WorkExperienceService) {}

    @Get()
    findAll(): Promise<Work_Experience[]>{
        return this.workExperienceService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Work_Experience>{
        return this.workExperienceService.findOne(Number(id));
    }

    @Post()
    create(@Body() workExperience: Partial<Work_Experience>): Promise<Work_Experience>{
        return this.workExperienceService.create(workExperience);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() workExperience: Partial<Work_Experience>): Promise<Work_Experience>{
        return this.workExperienceService.update(Number(id), workExperience);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.workExperienceService.remove(Number(id));
    }
}
