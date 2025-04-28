import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateFacultyDto {
  @IsString()
  @IsOptional()
  @Length(2, 255)
  faculty_name?: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  short_name?: string;
}