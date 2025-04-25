import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmployeeAchievementService } from './employee-achievement.service';
import { CreateEmployeeAchievementDto } from 'src/dto/emploee-achievement/сreate';
import { UpdateEmployeeAchievementDto } from 'src/dto/emploee-achievement/update';
import { EmployeeAchievementResponceDto } from 'src/dto/emploee-achievement/responce';
import { AchivementStatsDto, TopEmployeeDto } from 'src/dto/emploee-achievement/stats';
@Controller('employee-achievement')
export class EmployeeAchievementController {
    constructor(private readonly employeeAchievementService: EmployeeAchievementService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createEmployeeAchievementDto: CreateEmployeeAchievementDto): Promise<EmployeeAchievementResponceDto>{
        const achievement = await this.employeeAchievementService.create(createEmployeeAchievementDto);
        return this.employeeAchievementService.toRespondDto(achievement);
    }

    @Get()
    async findAll(): Promise<EmployeeAchievementResponceDto[]>{
        const achivements = await this.employeeAchievementService.findAll();
        return achivements.map(achievement => this.employeeAchievementService.toRespondDto(achievement));
    }

    @Get('stats')
    getAchievementStats(): Promise<AchivementStatsDto>{
        return this.employeeAchievementService.getAchievementStats();
    }

    @Get('latest')
    async getLatestAchievement(@Query('limit', ParseIntPipe) limit?: number): Promise<EmployeeAchievementResponceDto[]>{
        const achivements = await this.employeeAchievementService.getLatestAchievement(limit);
        return achivements.map(achivement => this.employeeAchievementService.toRespondDto(achivement));
    }

    @Get('top-employees')
    getTopEmployees(@Query('limit', ParseIntPipe) limit?: number): Promise<TopEmployeeDto[]>{
        return this.employeeAchievementService.getEmployeeWithMostAchievements(limit);
    }

    @Get('empoloyee/:employeeId')
    async findByEmployee(@Param('employeeId', ParseIntPipe) employeeId: number): Promise<EmployeeAchievementResponceDto[]>{
        const achiements = await this.employeeAchievementService.findByAchieventType(employeeId);
        return achiements.map(achiement => this.employeeAchievementService.toRespondDto(achiement));
    }

    @Get('type/:achievementTypeId')
    async findByAchievementType(@Param('achievementTypeId', ParseIntPipe) achievementTypeId: number): Promise<EmployeeAchievementResponceDto[]>{
        const achievemnts = await this.employeeAchievementService.findByAchieventType(achievementTypeId);
        return achievemnts.map(achievemnt => this.employeeAchievementService.toRespondDto(achievemnt));
    }

    @Get('date-range')
    async findByDateRAnge(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<EmployeeAchievementResponceDto[]>{
        const achievements = await this.employeeAchievementService.findByDateRanger(
            new Date(startDate),
            new Date(endDate),
        );
        return achievements.map(achievement => this.employeeAchievementService.toRespondDto(achievement));
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<EmployeeAchievementResponceDto>{
        const achivement = await this.employeeAchievementService.findOne(id);
        return this.employeeAchievementService.toRespondDto(achivement);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateEmployeeAchievementDto: UpdateEmployeeAchievementDto,
    ): Promise<EmployeeAchievementResponceDto>{
        const achievement = await this.employeeAchievementService.update(id, updateEmployeeAchievementDto)
        return this.employeeAchievementService.toRespondDto(achievement);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.employeeAchievementService.remove(id);
    }
}   
