import { Controller, Body, Get, Post, Patch, Param, Delete } from '@nestjs/common';
import { AcademicStatusService } from './academic-status.service';
import { AcademicStatus } from '../entity/academic-status';
@Controller('academic-status')
export class AcademicStatusController {
    constructor(private readonly academicStatusService: AcademicStatusService) {}

    @Post()
    create(@Body() academicStatusData): Promise<AcademicStatus>{
        return this.academicStatusService.create(academicStatusData);
    }

    @Get()
    findAll(): Promise<AcademicStatus[]> {
        return this.academicStatusService.findAll();
    }

    @Get('stats')
    getAcademicStats(){
        return this.academicStatusService.getAcademicStats();
    }

    @Get('employee/:employeeId')
    findByEmployeeId(@Param('employeeId') employeeId: string): Promise<AcademicStatus> {
        return this.academicStatusService.findByEmployeeId(+employeeId);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<AcademicStatus>{
        return this.academicStatusService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() academicStatusData: Partial<AcademicStatus>
    ): Promise<AcademicStatus>{
        return this.academicStatusService.update(+id, academicStatusData);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.academicStatusService.remove(+id);
    }
}
 