import { Expose, Exclude, Type } from 'class-transformer';

export class ResponceAchieveDto{ 
    @Expose()
    id: number;

    @Expose()
    name: string;

    // @Expose()
    // @Type(() => EmployeeAchievementResponseDto)
    // employeeAchievement?: EmployeeAchievementResponseDto[];

    @Exclude()
    createdAt?: Date;

    @Exclude()
    updatedAt?: Date;

    @Exclude()
    deleteAt?: Date;
}