import { Exclude, Expose, Type } from "class-transformer";
import { EmployeeResponceDto } from "../employee/responce";
export class ResponceTeacherDisciplineDto{
    @Expose()
    id: number;

    @Expose()
    employeeId: number;

    @Expose()
    disciplineName: string;

    @Expose()
    @Type(() => EmployeeResponceDto)
    employee: EmployeeResponceDto;

    @Expose()
    createdAt?: Date;

    @Expose()
    updatedAt?: Date;

    @Expose()
    deleterdAt?: Date;
}