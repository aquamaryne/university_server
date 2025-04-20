import { IsString, IsNumber, IsDate, IsOptional, Length, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'

export class CreatePassportDataDto{
    @IsOptional()
    @IsNumber()
    employeeId?: number

    @IsString()
    @IsNotEmpty({ message: 'Passport number cannot be empty '})
    @Length(5, 255, { message: 'Passport number must be between 2 and 255 characters '})
    passport: string;

    @IsString()
    @IsNotEmpty({ message: 'Passport issued by cannot be empty '})
    @Length(3 , 255, { message: 'Passport issued by must be between 3 and 255 characters '})
    passportIssuedBy: string;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty({ message: 'Passport issued date cannot be empty' })
    passportDateIssued: Date;
}