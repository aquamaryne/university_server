import { IsString, IsNumber, IsOptional, IsDate } from "class-validator";
import { Type } from 'class-transformer';

export class UpdateWorkExperienceDto {
    @IsNumber()
    @IsOptional()
    employeId?: number;

    @IsNumber()
    @IsOptional()
    workplaceName?: string;

    @IsString()
    @IsOptional()
    position?: string;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    startDate?: Date;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    endDate?: Date;

    @IsString()
    @IsOptional()
    reasonOfLeaving?: string;
}