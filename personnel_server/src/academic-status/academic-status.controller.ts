import { Controller, Body, Get, Post, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { AcademicStatusService } from './academic-status.service';
import { CreateAcamicStatusDto } from 'src/dto/academic-status/create';
import { UpdateAcamicStatusDto } from 'src/dto/academic-status/update';
import { ResponseAcademicStatusDto } from 'src/dto/academic-status/responce';
import { AcademicStatsDto, AcademicExperienceStatsDto } from 'src/dto/academic-status/stats';
@Controller('academic-status')
export class AcademicStatusController {
    constructor(private readonly academicStatusService: AcademicStatusService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createAcademicStatusData: CreateAcamicStatusDto): Promise<ResponseAcademicStatusDto>{
        const academiStatus = await this.academicStatusService.create(createAcademicStatusData);
        return this.academicStatusService.toResponceDto(academiStatus);   
    }

    @Get()
    async findAll(): Promise<ResponseAcademicStatusDto[]> {
        const academicStatus = await this.academicStatusService.findAll();
        return academicStatus.map(academicStatus => this.academicStatusService.toResponceDto(academicStatus));
    }

    @Get('stats')
    getAcademicStats(): Promise<AcademicStatsDto>{
        return this.academicStatusService.getAcademicStats();
    }

    @Get('employee/:employeeId')
    async findByEmployeeId(@Param('employeeId') employeeId: number): Promise<ResponseAcademicStatusDto> {
        const academicStatus = await this.academicStatusService.findByEmployeeId(employeeId)
        return this.academicStatusService.toResponceDto(academicStatus);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ResponseAcademicStatusDto>{
        const academicStatus = await this.academicStatusService.findOne(id);
        return this.academicStatusService.toResponceDto(academicStatus);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateAcademicStatusData: UpdateAcamicStatusDto
    ): Promise<ResponseAcademicStatusDto>{
        const academicStatus = await this.academicStatusService.update(id, updateAcademicStatusData);
        return this.academicStatusService.toResponceDto(academicStatus);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void>{
        return this.academicStatusService.remove(+id);
    }
}
 