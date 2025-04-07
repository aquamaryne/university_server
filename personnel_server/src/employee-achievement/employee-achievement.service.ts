import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { EmployeeAchievement } from 'src/entity/employee-achivement';
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

    async create(achievementType: Partial<EmployeeAchievement>): Promise<EmployeeAchievement>{
        const achievement = this.employeeAchievemmentRepository.create(achievementType);
        return this.employeeAchievemmentRepository.save(achievement);
    }

    async update(
        id: number,
        achievementData: Partial<EmployeeAchievement>,
    ): Promise<EmployeeAchievement>{
        const achievement = await this.findOne(id);
        Object.assign(achievement, achievementData);
        return this.employeeAchievemmentRepository.save(achievement);
    }

    async remove(id: number): Promise<void>{
        const achievement = await this.findOne(id);
        await this.employeeAchievemmentRepository.remove(achievement);
    }

    async getAchievementStats(): Promise<{
        totalAchievements: number;
        achievementsByType: { [key: string ]: number};
        achievementsByDate: { [key: string ]: number};
    }> {
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

        return {
            totalAchievements,
            achievementsByType: achievementByType,
            achievementsByDate: achievementByYear,
        }
    }

    async getLatestAchievement(limit: number = 5): Promise<EmployeeAchievement[]> {
        return this.employeeAchievemmentRepository.find({
            relations: ['employee', 'achievementType'],
            order: { dateReceived: 'DESC' },
            take: limit,
        })
    }

    async getEmployeeWithMostAchievements(limit: number = 10): Promise<any[]> {
        return this.employeeAchievemmentRepository
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
    }
}
