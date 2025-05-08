import { Expose, Exclude, Type } from 'class-transformer';
import { EmployeeAchievementResponceDto } from '../emploee-achievement/responce';
export class ResponceAchieveDto{ 
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    @Type(() => EmployeeAchievementResponceDto)
    employeeAchievement?: EmployeeAchievementResponceDto[];

    @Exclude()
    createdAt?: Date;

    @Exclude()
    updatedAt?: Date;

    @Exclude()
    deleteAt?: Date;
}