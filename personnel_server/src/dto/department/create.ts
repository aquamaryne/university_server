import { IsNotEmpty, IsOptional, IsString, IsNumber, Length } from "class-validator";

export class DepartmentCreateDto{
    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    name: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    shortName: string;

    @IsNumber()
    @IsOptional()
    facultyId?: number;
}