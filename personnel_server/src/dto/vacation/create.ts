import { IsNotEmpty, IsOptional, IsNumber, IsString, IsDate, IsBoolean, MinDate, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVacationDto{
    @IsNumber()
    @IsNotEmpty()
    employementId: number;

    @IsString()
    @IsNotEmpty()
    vacation_type: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    start_date: Date;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    @ValidateIf((o) => o.start_date)
    @MinDate(new Date('start_date'))
    end_date: Date;

    @IsNumber()
    @IsNotEmpty()
    order_number: number;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    order_date: Date;

    @IsBoolean()
    @IsNotEmpty()
    is_paid: boolean;

    @IsString()
    @IsOptional()
    notes?: string;
}