import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { UnviversityEmploymentService } from './unviversity-employment.service';
import { UniversityEmployment } from '../entity/university-employment';

@Controller('unviversity-employment')
export class UnviversityEmploymentController {
    constructor(private readonly universityEmploymentService: UnviversityEmploymentService){}

    @Post()
    create(@Body() employmentData: Partial<UniversityEmployment>): Promise<UniversityEmployment>{
        return this.universityEmploymentService.create(employmentData);
    }

    @Get()
    findAll(): Promise<UniversityEmployment[]>{
        return this.universityEmploymentService.fundAll();
    }

    @Get('stats/department')
    getStatsByDepartment(){
        return this.universityEmploymentService.getStatsByDepartment();
    }

    @Get('stats/position')
    getStatsByPosition(){
        return this.universityEmploymentService.getStatsByPosition();
    }

    @Get('stats/work-mode')
    getStatsByWorkMode(){
        return this.universityEmploymentService.getStatsByWorkMode();
    }

    @Get('stats/avg-experience')
    getAvgEmperienceByDepartment(){
        return this.universityEmploymentService.getAvgExperienceByDepartment();
    }

    @Get('expiring-contracts')
    findWithExpiringContracts(@Query('days', ParseIntPipe) days?: number): Promise<UniversityEmployment[]>{
        return this.universityEmploymentService.findWithExpiringContracts(days);
    }

    @Get('contract-date-range')
    findByContractEndDateRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<UniversityEmployment[]>{
        return this.universityEmploymentService.findContractEndDateRange(
            new Date(startDate),
            new Date(endDate),
        )
    }

    @Get('experience')
    getEmployeesByExpierence(
        @Query('min', ParseIntPipe) minYears: number,
        @Query('max', ParseIntPipe) maxYears?: number,
    ): Promise<UniversityEmployment[]>{
        return this.universityEmploymentService.getEmployeesByExpirience(minYears, maxYears);
    }

    @Get('employee/:employeeId')
    findByEmployee(@Param('employeeId', ParseIntPipe) employeeId: number): Promise<UniversityEmployment>{
        return this.universityEmploymentService.findByEmployee(employeeId);
    }

    @Get('employee/:departmentId')
    findByDepartment(@Param('departmentId', ParseIntPipe) departmentId: number): Promise<UniversityEmployment[]>{
        return this.universityEmploymentService.findByDepartment(departmentId);
    }

    @Get('position/:positionId')
    findByposition(@Param('positionId', ParseIntPipe) positionId: number): Promise<UniversityEmployment[]>{
        return this.universityEmploymentService.findByWorkMode(positionId);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<UniversityEmployment>{
        return this.universityEmploymentService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() employmentData: Partial<UniversityEmployment>,
    ): Promise<UniversityEmployment>{
        return this.universityEmploymentService.update(id, employmentData);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.universityEmploymentService.remove(id);
    }
}
