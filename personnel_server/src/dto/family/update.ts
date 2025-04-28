import { IsOptional, IsNumber, IsString, Length } from 'class-validator';

export class UpdateFamilyDto {
  @IsNumber()
  @IsOptional()
  employeeId?: number;

  @IsString()
  @IsOptional()
  @Length(2, 255)
  relationType?: string;

  @IsString()
  @IsOptional()
  @Length(2, 255)
  fullName?: string;
}