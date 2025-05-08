import { IsString, IsNumber, IsOptional, IsDate, IsNotEmpty } from "class-validator";
import { Type } from 'class-transformer';

export class CreateWorkExperienceDto {
    @IsNumber()
    @IsNotEmpty()
    employeId: number;

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