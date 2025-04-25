import { IsOptional, IsNumber, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class UpdateEmployeeAchievementDto{
    @IsNumber()
    @IsOptional()
    employeeId: number;

    @IsNumber()
    @IsOptional()
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