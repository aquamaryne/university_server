import { IsString, IsNumber, IsOptional, IsDate } from "class-validator";
import { Type } from 'class-transformer';

export class UpdateUniversityEmployeeDto{
    @IsNumber()
    @IsOptional()
    employeeId: number;

    @IsNumber()
    @IsOptional()
    departmentId?: number;

    @IsNumber()
    @IsOptional()
    positionId?: number;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    dateOfAccept?: Date;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    dateOfPositionStart?: Date;

    @IsString()
    @IsOptional()
    orderNumber?: string;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    orderDate?: Date;

    @IsNumber()
    @IsOptional()
    workModeId?: number;

    @IsNumber()
    @IsOptional()
    totalExperienceYears?: number;

    @IsOptional()
    @IsNumber()
    continuousWorkYears?: number;

    @IsNumber()
    @IsOptional()
    employeeContract?: string;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    employementContractEndDate?: Date;

    @IsString()
    @IsOptional()
    previousJobs?: string;
}