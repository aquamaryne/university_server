import { Controller, Post, Body, ParseIntPipe, Query, Param, Get, Patch, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { VacationService } from './vacation.service';
import { Vacation } from 'src/entity/vacation';
import { CreateVacationDto } from 'src/dto/vacation/create';
import { UpdateVacationDto } from 'src/dto/vacation/update';
import { VacationResponceDto } from 'src/dto/vacation/responce';
import { VacationTypeStatsDto, VacationEmployeeStatsDto, VacationMonthlyStatsDto } from 'src/dto/vacation/stats';
@Controller('vacation')
export class VacationController {
    constructor(private readonly vacationService: VacationService){}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createVacationData: CreateVacationDto): Promise<VacationResponceDto>{
        const vacation = await this.vacationService.create(createVacationData);
        return this.vacationService.toResponseDto(vacation)
    }

    @Get()
    async findAll(): Promise<VacationResponceDto[]>{
        const vacations = await this.vacationService.findALl();
        return this.vacationService.toReponseDtoArray(vacations);
    }

    @Get('current')
    async findCurrentVacations(): Promise<VacationResponceDto[]>{
        const vacations = await this.vacationService.findCurrentVacations();
        return this.vacationService.toReponseDtoArray(vacations);
    }

    @Get('upcoming')
    async findUpComingVacation(@Query('days', ParseIntPipe) days?: number): Promise<VacationResponceDto[]>{
        const vacations = await this.vacationService.findUpcomingVacations(days);
        return this.vacationService.toReponseDtoArray(vacations);
    }

    @Get('stats/type')
    getVacationsStatsByType(): Promise<VacationTypeStatsDto[]>{
        return this.vacationService.getVacationStatsByType();
    }

    @Get('stats/employee/:employeeId')
    getVacationsStatsByEmployee(@Param('employeeId') employeeId: number): Promise<VacationEmployeeStatsDto>{
        return this.vacationService.getVacationStatsByEmployee(employeeId);
    }

    @Get('type/:vacationType')
    async findVacationType(@Param('vacationtype') vacationType: string): Promise<VacationResponceDto[]>{
        const vacations = await this.vacationService.findVacationType(vacationType);
        return this.vacationService.toReponseDtoArray(vacations);
    }

    @Get('date-range')
    async findByDateRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<VacationResponceDto[]>{
        const vacation = await this.vacationService.findByDateRange(
            new Date(startDate),
            new Date(endDate),
        );
        return this.vacationService.toReponseDtoArray(vacation);
    }

    @Get('employee/:employeeId')
    async fundByEmployee(@Param('employeeId', ParseIntPipe) employeeId: number): Promise<VacationResponceDto[]>{
        const vacation = await this.vacationService.findByEmployee(employeeId);
        return this.vacationService.toReponseDtoArray(vacation);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<VacationResponceDto>{
        const vacation = await this.vacationService.findOne(id);
        return this.vacationService.toResponseDto(vacation);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateVacationData: UpdateVacationDto,
    ): Promise<VacationResponceDto>{
        const vacation = await this.vacationService.update(id, updateVacationData);
        return this.vacationService.toResponseDto(vacation)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.vacationService.remove(id);
    }
}
