import { Exclude, Expose, Type } from "class-transformer";
import { EmployeeResponceDto } from "../employee/responce";

export class EmployeeTypeResponceDto{
    @Expose()
    id: number;

    @Expose()
    typeName: string;

    @Expose()
    description: string;

    @Expose()
    @Type(() => EmployeeResponceDto)
    employee?: EmployeeResponceDto[];

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Exclude()
    deleteAt?: Date;
}