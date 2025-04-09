import { IsString, IsOptional, IsInt, IsDate, IsNotEmpty, Length, IsIn } from "class-validator";
import { Type } from "class-transformer"; 

export class CreateEmployeeDto{
    @IsOptional()
    @IsString()
    readonly indentifyNumber?: number;

    @IsOptional()
    @IsString()
    readonly uniqueCard?: string;

    @IsOptional()
    @IsString()
    readonly personalCardNumber? :string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    readonly firstName: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    readonly secondName: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    readonly fatherly?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    readonly dateOfBirth?: Date;

    @IsOptional()
    @IsString()
    @IsIn(['Male', 'Female', 'M', 'F', 'Ч', 'Ж'])
    @Length(1, 10)
    readonly sex?: string;

    @IsOptional()
    @IsInt()
    readonly employeeTypeId?: number;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    readonly dateOfEnterCard?: Date;
}