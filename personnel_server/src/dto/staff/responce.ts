import { Expose, Exclude, Type } from 'class-transformer';
import { EmployeeResponceDto } from '../employee/responce';
import { ResponceDepartmentDto } from '../department/responce';

export class StaffResponceDto{
    @Expose()
    id: number;

    @Expose()
    employeeId: number;

    @Expose()
    staffCategory: string;

    @Expose()
    departmentId: number;

    @Expose()
    @Type(() => EmployeeResponceDto)
    employee?: EmployeeResponceDto;

    @Expose()
    @Type(() => ResponceDepartmentDto)
    department?: ResponceDepartmentDto;

    @Exclude()
    createdAt?: Date;

    @Exclude()
    updatedAt?: Date;

    @Exclude()
    deletedAt?: Date;

    @Expose()
    get fullName(): string {
        return this.employee ? `${this.employee.firstName} ${this.employee.secondName}` : `Uknown`;
    }

    @Expose()
    get departmentName(): string {
        return this.department ? this.department.name : 'Unassigned';
    }
}