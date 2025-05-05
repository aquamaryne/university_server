import { IsString, IsNumber, IsOptional } from "class-validator";

export class UpdateStaffDto{
    @IsNumber()
    @IsOptional()
    employeeId?: number;

    @IsString()
    @IsOptional()
    staffCategory?: string;

    @IsNumber()
    @IsOptional()
    departmentId?: number;
}