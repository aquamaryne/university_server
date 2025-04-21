import { Expose } from 'class-transformer';

export class EmployeeTypeStatsDto{
    @Expose()
    typeId: number;

    @Expose()
    typeName: string;

    @Expose()
    employeeCount: number;
}