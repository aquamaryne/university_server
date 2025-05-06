import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { UnviversityEmploymentService } from './unviversity-employment.service';
import { CreateUniversityEmployeeDto } from 'src/dto/university-employement/create';
import { UpdateUniversityEmployeeDto } from 'src/dto/university-employement/update';
import { UniversityEmployementResponseDto } from 'src/dto/university-employement/responce';
@Controller('unviversity-employment')
export class UnviversityEmploymentController {
    constructor(private readonly universityEmploymentService: UnviversityEmploymentService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createDto: CreateUniversityEmployeeDto): Promise<UniversityEmployementResponseDto> {
        return this.universityEmploymentService.create(createDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<UniversityEmployementResponseDto[]> {
        return this.universityEmploymentService.findAll();
    }

    @Get('stats/department')
    @HttpCode(HttpStatus.OK)
    getStatsByDepartment() {
        return this.universityEmploymentService.getStatsByDepartment();
    }

    @Get('stats/position')
    @HttpCode(HttpStatus.OK)
    getStatsByPosition() {
        return this.universityEmploymentService.getStatsByPosition();
    }

    @Get('stats/work-mode')
    @HttpCode(HttpStatus.OK)
    getStatsByWorkMode() {
        return this.universityEmploymentService.getStatsByWorkMode();
    }

    @Get('stats/avg-experience')
    @HttpCode(HttpStatus.OK)
    getAvgExperienceByDepartment() {
        return this.universityEmploymentService.getAvgExperienceByDepartment();
    }

    @Get('expiring-contracts')
    @HttpCode(HttpStatus.OK)
    findWithExpiringContracts(@Query('days', ParseIntPipe) days?: number): Promise<UniversityEmployementResponseDto[]> {
        return this.universityEmploymentService.findWithExpiringContracts(days);
    }

    @Get('contract-date-range')
    @HttpCode(HttpStatus.OK)
    findByContractEndDateRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<UniversityEmployementResponseDto[]> {
        return this.universityEmploymentService.findContractEndDateRange(
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Get('experience')
    @HttpCode(HttpStatus.OK)
    getEmployeesByExperience(
        @Query('min', ParseIntPipe) minYears: number,
        @Query('max', ParseIntPipe) maxYears?: number,
    ): Promise<UniversityEmployementResponseDto[]> {
        return this.universityEmploymentService.getEmployeesByExpirience(minYears, maxYears);
    }

    @Get('employee/:employeeId')
    @HttpCode(HttpStatus.OK)
    findByEmployee(@Param('employeeId', ParseIntPipe) employeeId: number): Promise<UniversityEmployementResponseDto> {
        return this.universityEmploymentService.findByEmployee(employeeId);
    }

    @Get('department/:departmentId')
    @HttpCode(HttpStatus.OK)
    findByDepartment(@Param('departmentId', ParseIntPipe) departmentId: number): Promise<UniversityEmployementResponseDto[]> {
        return this.universityEmploymentService.findByDepartment(departmentId);
    }

    @Get('work-mode/:workModeId')
    @HttpCode(HttpStatus.OK)
    findByWorkMode(@Param('workModeId', ParseIntPipe) workModeId: number): Promise<UniversityEmployementResponseDto[]> {
        return this.universityEmploymentService.findByWorkMode(workModeId);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id', ParseIntPipe) id: number): Promise<UniversityEmployementResponseDto> {
        return this.universityEmploymentService.findOne(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdateUniversityEmployeeDto,
    ): Promise<UniversityEmployementResponseDto> {
        return this.universityEmploymentService.update(id, updateDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.universityEmploymentService.remove(id);
    }
}
