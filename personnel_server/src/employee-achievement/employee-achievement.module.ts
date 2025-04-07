import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeAchievement } from '../entity/employee-achivement';
import { EmployeeAchievementService } from './employee-achievement.service';
@Module({
    imports: [TypeOrmModule.forFeature([EmployeeAchievement])],
    controllers: [],
    providers: [EmployeeAchievementService],
    exports: [EmployeeAchievementService],
})
export class EmployeeAchievementModule {}
