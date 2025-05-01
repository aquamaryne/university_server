import { IsOptional, IsNumber, IsString, IsBoolean, Length } from 'class-validator';

export class UpdatePersonalInfoDto {
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
  @IsOptional()
  @Length(5, 255)
  phoneNumber?: string;

  @IsBoolean()
  @IsOptional()
  isPartTimer?: boolean;

  @IsBoolean()
  @IsOptional()
  isUniversityEducation?: boolean;
}