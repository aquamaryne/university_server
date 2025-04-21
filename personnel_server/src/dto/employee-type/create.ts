import { IsString, IsOptional, Length, IsNotEmpty, IsArray } from 'class-validator'


export class EmployeeTypeCreateDto{
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    typeName: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsArray()
    @IsOptional()
    employees?: number[]; 

}