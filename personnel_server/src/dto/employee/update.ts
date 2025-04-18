import { IsString, IsOptional, IsInt, IsDate, Length, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEmployeeDto{
    @IsOptional()
    @IsString()
    readonly indentifyNumber?: number;

    @IsOptional()
    @IsString()
    readonly uniqueCard?: string;

    @IsOptional()
    @IsString()
    readonly personalCardNumber?: string;

    @IsOptional()
    @IsString()
    @Length(1, 255)
    readonly firtsName?: string;

    @IsOptional()
    @IsString()
    @Length(1, 255)
    readonly secondName?: string;

    @IsOptional()
    @IsString()
    @Length(1, 255)
    readonly fatherly?: string;

    @IsOptional()
    @Type(() => Date)
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