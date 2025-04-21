import { IsOptional, IsNumber, IsString, IsDate, IsBoolean, MinDate, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateVacationDto{
    @IsNumber()
    @IsOptional()
    employementId: number;

    @IsString()
    @IsOptional()
    vacation_type: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    start_date: Date;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ValidateIf((o) => o.start_date)
    @MinDate(new Date('start_date'))
    end_date: Date;

    @IsNumber()
    @IsOptional()
    order_number: number;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    order_date: Date;

    @IsBoolean()
    @IsOptional()
    is_paid: boolean;

    @IsString()
    @IsOptional()
    notes?: string;
}