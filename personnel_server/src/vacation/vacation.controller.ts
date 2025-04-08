import { Controller, Post, Body, ParseIntPipe, Query, Param, Get, Patch, Delete } from '@nestjs/common';
import { VacationService } from './vacation.service';
import { Vacation } from 'src/entity/vacation';

@Controller('vacation')
export class VacationController {
    constructor(private readonly vacationService: VacationService){}

    @Post()
    create(@Body() vacationData: Partial<Vacation>): Promise<Vacation>{
        return this.vacationService.create(vacationData)
    }

    @Get()
    findAll(): Promise<Vacation[]>{
        return this.vacationService.findALl();
    }

    @Get('current')
    findCurrentVacations(): Promise<Vacation[]>{
        return this.vacationService.findCurrentVacations();
    }

    @Get('upcoming')
    findUpComingVacation(@Query('days', ParseIntPipe) days?: number): Promise<Vacation[]>{
        return this.vacationService.findUpcomingVacations(days);
    }

    @Get('stats/type')
    getVacationsStatsByType(){
        return this.vacationService.getVacationStatsByType();
    }

    @Get('stats/employee/:employeeId')
    findVacationType(@Param('vacationType') vacationType: string): Promise<Vacation[]>{
        return this.vacationService.findVacationType(vacationType);
    }

    @Get('date-range')
    findByDateRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<Vacation[]>{
        return this.vacationService.findByDateRange(
            new Date(startDate),
            new Date(endDate),
        )
    }

    @Get('employee/:employeeId')
    fundByEmployee(@Param('employeeId', ParseIntPipe) employeeId: number): Promise<Vacation[]>{
        return this.vacationService.findByEmployee(employeeId);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Vacation>{
        return this.vacationService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() vacationData: Partial<Vacation>,
    ): Promise<Vacation>{
        return this.vacationService.update(id, vacationData)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.vacationService.remove(id);
    }
}
