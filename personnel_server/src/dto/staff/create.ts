import { IsString, IsNumber, IsOptional, IsNotEmpty } from "class-validator";

export class CreateStaffDto{
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    employeeId?: number;

    @IsString()
    @IsOptional()
    staffCategory?: string;

    @IsNumber()
    @IsOptional()
    departmentId?: number;
}