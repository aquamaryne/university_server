import { IsNumber, IsBoolean, IsOptional, IsString, Min } from "class-validator";

export class CreateAcamicStatusDto {
    @IsNumber()
    @IsOptional()
    employeeId?: number;

    @IsBoolean()
    @IsOptional()
    isAcademic?: boolean;

    @IsBoolean()
    @IsOptional()
    isDoctor?: boolean;

    @IsBoolean()
    @IsOptional()
    isCandidate?: boolean;

    @IsNumber()
    @IsOptional()
    @Min(0)
    totalAcademicExperience?: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    instituteAcademicExperience?: number;

    @IsString()
    @IsOptional()
    academicDegree?: string;

    @IsString()
    @IsOptional()
    academicTitle?: string;
}