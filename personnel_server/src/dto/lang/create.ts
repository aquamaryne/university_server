import { IsNotEmpty, IsOptional, IsNumber, IsString, Length, IsIn } from "class-validator";

export class CreateLanguageDto{
    @IsNumber()
    @IsNotEmpty()
    employeeId: number;

    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    languageName: string;

    @IsOptional()
    @IsString()
    @Length(2, 50)
    @IsIn(['Базовий', 'Середній', 'Просунутий', 'Вільний', 'Рідний'], {
        message: 'proficiencyLevel must be one of: Basic, Intermediate, Advanced, Fluent, Native'
    })
    proficiencyLevel?: string;
}