import { Expose, Type } from 'class-transformer'

export class AchievementStatsByTypeDto{
    @Expose()
    typeName: string;

    @Expose()
    count: number;
}

export class AchievementStatsByYearDto{
    @Expose()
    year: number;

    @Expose()
    count: number;
}

export class AchivementStatsDto {
    @Expose()
    totalAchievements: number;

    @Expose()
    @Type(() => AchievementStatsByTypeDto)
    achievementsByType: Record<string, number>

    @Expose()
    @Type(() => AchievementStatsByYearDto)
    achievementsByDate: Record<string, number>
}

export class TopEmployeeDto{
    @Expose()
    employeeId: number;

    @Expose()
    employeeName: string;

    @Expose()
    employeeSname: string;

    @Expose()
    achievementCount: number;

    @Expose()
    get fullName(): string{
        return `${this.employeeSname} ${this.employeeName}`
    }
}