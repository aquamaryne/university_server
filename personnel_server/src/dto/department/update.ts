import { IsOptional, IsString, IsNumber, Length } from 'class-validator';

export class DepartmentUpdateDto {
  @IsString()
  @IsOptional()
  @Length(2, 255)
  name?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  shortName?: string;

  @IsNumber()
  @IsOptional()
  facultyId?: number;
}