import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { EmployeeAchievement } from 'src/entity/employee-achivement';
import { CreateEmployeeAchievementDto } from 'src/dto/emploee-achievement/сreate';
import { UpdateEmployeeAchievementDto } from 'src/dto/emploee-achievement/update';
import { EmployeeAchievementResponceDto } from 'src/dto/emploee-achievement/responce';
import { AchivementStatsDto, TopEmployeeDto } from 'src/dto/emploee-achievement/stats';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class EmployeeAchievementService {
    constructor(
        @InjectRepository(EmployeeAchievement)
        private employeeAchievemmentRepository: Repository<EmployeeAchievement>,
    ) {}

    async findAll(): Promise<EmployeeAchievement[]>{
        return this.employeeAchievemmentRepository.find({
            relations: ['employee'],
        });
    }

    async findOne(id: number): Promise<EmployeeAchievement>{
        const achivement = await this.employeeAchievemmentRepository.findOne({
            where: { id },
            relations: ['employee', 'achievementType'],
        });

        if(!achivement) {
            throw new NotFoundException(`Achievement with ID ${id} not found`);
        }

        return achivement;
    }

    async findByEmployee(employeeId: number): Promise<EmployeeAchievement[]>{
        return this.employeeAchievemmentRepository.find({
            where: { employeeId },
            relations: ['acievementType'],
        });
    }

    async findByAchieventType(achievementTypeId: number): Promise<EmployeeAchievement[]>{
        return this.employeeAchievemmentRepository.find({
            where: { achievementTypeId },
            relations: ['employee'],
        });
    }

    async findByDateRanger(startDate: Date, endDate: Date): Promise<EmployeeAchievement[]>{
        return this.employeeAchievemmentRepository.find({
            where:{
                dateReceived: Between(startDate, endDate)
            },
            relations: ['employee', 'achievementType'],
        });
    }

    async create(createEmployeeAchievementDto: CreateEmployeeAchievementDto): Promise<EmployeeAchievement>{
        const achievement = this.employeeAchievemmentRepository.create(createEmployeeAchievementDto);
        const savedAchievement = await this.employeeAchievemmentRepository.save(achievement);
        return this.findOne(savedAchievement.id);
    }

    async update(
        id: number,
        updateEmployeeAchievementDto: UpdateEmployeeAchievementDto,
    ): Promise<EmployeeAchievement>{
        const achievement = await this.findOne(id);
        Object.assign(achievement, updateEmployeeAchievementDto);
        await this.employeeAchievemmentRepository.save(achievement);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        const achievement = await this.findOne(id);
        await this.employeeAchievemmentRepository.remove(achievement);
    }

    async getAchievementStats(): Promise<AchivementStatsDto> {
        const totalAchievements = await this.employeeAchievemmentRepository.count();
        const achievementsByTypeDate = await this.employeeAchievemmentRepository
            .createQueryBuilder('achievement')
            .leftJoinAndSelect('achievement.achievementType', 'type')
            .select('type.id', 'type')
            .addSelect('type.name', 'name')
            .addSelect('COUNT(achievement.id)', 'count')
            .groupBy('type.id')
            .getRawMany();

        const achievementsByYearData = await this.employeeAchievemmentRepository
            .createQueryBuilder('achievement')
            .select('EXTRACT(YEAR FROM achievement.dateReceived)', 'year')
            .addSelect('COUNT(achievement.id)', 'count')
            .groupBy('EXTRACT(YEAR FROM achievement.dateReceived)')
            .getRawMany();

        const achievementByType = {};
        achievementsByTypeDate.forEach(item => {
            achievementByType[item.typeName] = parseInt(item.count);
        })

        const achievementByYear = {};
        achievementsByYearData.forEach(item => {
            achievementByYear[item.year] = parseInt(item.count);
        })

        const stats = {
            totalAchievements,
            achievementByType,
            achievementByDate: achievementByYear,
        }

        return plainToInstance(AchivementStatsDto, stats, {
            excludeExtraneousValues: true,
        })
    }

    async getLatestAchievement(limit: number = 5): Promise<EmployeeAchievement[]> {
        return this.employeeAchievemmentRepository.find({
            relations: ['employee', 'achievementType'],
            order: { dateReceived: 'DESC' },
            take: limit,
        })
    }

    async getEmployeeWithMostAchievements(limit: number = 10): Promise<TopEmployeeDto[]> {
        const topEmployeeDto = await this.employeeAchievemmentRepository
            .createQueryBuilder('achievement')
            .leftJoin('achievement.employee', 'employee')
            .select('employee.id', 'employeeId')
            .addSelect('employee.name', 'employeeName')
            .addSelect('employee.sname', 'employeeSname')
            .addSelect('COUNT(achievement.id)', 'achievementCount')
            .groupBy('employee.id')
            .orderBy('achievementCount', 'DESC')
            .limit(limit)
            .getRawMany()
        
        return plainToInstance(TopEmployeeDto, topEmployeeDto, {
            excludeExtraneousValues: true,
        });
    }

    toRespondDto(achiement: EmployeeAchievement): EmployeeAchievementResponceDto {
        return plainToInstance(EmployeeAchievementResponceDto, achiement, {
            excludeExtraneousValues: true,
        })
    }
}
