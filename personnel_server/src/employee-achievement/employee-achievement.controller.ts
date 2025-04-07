import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { EmployeeAchievementService } from './employee-achievement.service';
import { EmployeeAchievement } from '../entity/employee-achivement';
@Controller('employee-achievement')
export class EmployeeAchievementController {
    constructor(private readonly employeeAchievementService: EmployeeAchievementService) {}

    @Post()
    create(@Body() achievementData: Partial<EmployeeAchievement>): Promise<EmployeeAchievement>{
        return this.employeeAchievementService.create(achievementData);
    }

    @Get()
    findAll(): Promise<EmployeeAchievement[]>{
        return this.employeeAchievementService.findAll();
    }

    @Get('stats')
    getAchievementStats(){
        return this.employeeAchievementService.getAchievementStats();
    }

    @Get('latest')
    getLatestAchievement(@Query('limit', ParseIntPipe) limit?: number): Promise<EmployeeAchievement[]>{
        return this.employeeAchievementService.getLatestAchievement (limit);
    }

    @Get('top-employees')
    getTopEmployees(@Query('limit', ParseIntPipe) limit?: number): Promise<EmployeeAchievement[]>{
        return this.employeeAchievementService.getEmployeeWithMostAchievements(limit);
    }

    @Get('empoloyee/:employeeId')
    findByEmployee(@Param('employeeId', ParseIntPipe) employeeId: number): Promise<EmployeeAchievement[]>{
        return this.employeeAchievementService.findByEmployee(employeeId);
    }

    @Get('type/:achievementTypeId')
    findByAchievementType(@Param('achievementTypeId', ParseIntPipe) achievementTypeId: number): Promise<EmployeeAchievement[]>{
        return this.employeeAchievementService.findByAchieventType(achievementTypeId);
    }

    @Get('date-range')
    findByDateRAnge(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<EmployeeAchievement[]>{
        return this.employeeAchievementService.findByDateRanger(
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<EmployeeAchievement>{
        return this.employeeAchievementService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() achievementData: Partial<EmployeeAchievement>,
    ): Promise<EmployeeAchievement>{
        return this.employeeAchievementService.update(id, achievementData);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.employeeAchievementService.remove(id);
    }
}   
