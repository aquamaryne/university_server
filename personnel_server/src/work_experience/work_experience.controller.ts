import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { WorkExperienceService } from './work_experience.service';
import { WorkExperience } from 'src/entity/work-experience';
import { CreateWorkExperienceDto } from 'src/dto/work-experience/create';
import { UpdateWorkExperienceDto } from 'src/dto/work-experience/update';
import { WorkExperienceResponceDto } from 'src/dto/work-experience/responce';
@Controller('work-experience')
export class WorkExperienceController {
    constructor(private readonly workExperienceService: WorkExperienceService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<WorkExperienceResponceDto[]>{
        return this.workExperienceService.findAll();
    }

    @Get('employee/:employeeId')
    @HttpCode(HttpStatus.OK)
    findByEmployee(
        @Param('employeeId', ParseIntPipe) employeeId: number
    ): Promise<WorkExperienceResponceDto[]>{
        return this.workExperienceService.findByEmployee(employeeId);
    }

    @Get('employee/:employeeId/totalYears')
    @HttpCode(HttpStatus.OK)
    getTotalExperienceYears(
        @Param('employeeId', ParseIntPipe) employeeId: number
    ): Promise<{ totalYears: number }> {
        return this.workExperienceService.getTotalExperienceYers(employeeId)
        .then(years => ({ totalYears: years }));
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: number): Promise<WorkExperienceResponceDto>{
        return this.workExperienceService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    create(@Body() createDto: CreateWorkExperienceDto): Promise<WorkExperienceResponceDto>{
        return this.workExperienceService.create(createDto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateDto: UpdateWorkExperienceDto): Promise<WorkExperienceResponceDto>{
        return this.workExperienceService.update(id, updateDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.workExperienceService.remove(id);
    }
}
