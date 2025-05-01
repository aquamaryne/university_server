import { IsNotEmpty, IsOptional, IsNumber, IsString, IsBoolean, Length } from "class-validator";

export class CreatePersonalInfoDto{
    @IsNumber()
    @IsOptional()
    employeeId?: number;

    @IsNumber()
    @IsOptional()
    birthPlaceId?: number;

    @IsNumber()
    @IsOptional()
    familyStatusId?: number;

    @IsString()
    @IsOptional()
    @Length(2, 255)
    homeAddress?: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 255)
    phoneNumber?: string;

    @IsBoolean()
    @IsOptional()
    isPartTime?: boolean;

    @IsBoolean()
    @IsOptional()
    isUniversityEducation?: boolean;
}