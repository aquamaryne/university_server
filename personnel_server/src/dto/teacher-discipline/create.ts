import { IsString, IsNumber, IsDate, IsOptional, Length, IsNotEmpty } from 'class-validator'

export class CreateTeacherDisciplineDto{
    @IsNumber()
    @IsNotEmpty()
    employeeId: number;

    @IsString()
    @IsNotEmpty()
    @Length(2, 255)
    disciplineName: string;
    
}