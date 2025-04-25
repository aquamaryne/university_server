import { IsNotEmpty, IsOptional, IsNumber, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateEmployeeAchievementDto{
    @IsNumber()
    @IsNotEmpty()
    employeeId: number;

    @IsNumber()
    @IsNotEmpty()
    achievemntTypeId: number;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    dateRecieved?: Date;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    certificateNumber?: string;
}