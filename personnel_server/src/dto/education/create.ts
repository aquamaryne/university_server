import { IsNotEmpty, IsOptional, IsString, IsNumber, Length, Min, Max } from "class-validator";

export class CreateEducationDto{
    @IsNumber()
    @IsOptional()
    employeeId?: number;

    @IsString()
    @IsNotEmpty()
    @Length(2, 255)
    degreeOfEducation: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 255)
    diploma: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 255)
    numberOfDiploma: string;

    @IsString()
    @IsOptional()
    @Length(2, 255)
    nameOfendHighUniversity?: string;

    @IsString()
    @IsOptional()
    @Length(2, 255)
    nameOfEndMiddleUniversity?: string;

    @IsNumber()
    @IsOptional()
    @Min(1900)
    @Max(new Date().getFullYear())
    graduationYear: number;

    @IsString()
    @IsOptional()
    @Length(2, 255)
    specialty?: string;

    @IsString()
    @IsOptional()
    @Length(2, 255)
    qualification?: string;
}