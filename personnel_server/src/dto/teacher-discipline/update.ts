import { IsOptional, IsNumber, IsString, Length } from "class-validator";

export class UpdateTeacherDisciplineDto {
    @IsOptional()
    @IsNumber()
    employeeId?: number;

    @IsOptional()
    @IsString()
    @Length(2, 255)
    disciplineName?: string;
}