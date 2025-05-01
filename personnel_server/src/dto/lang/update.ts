import { IsOptional, IsNumber, IsString, Length, IsIn } from 'class-validator';

export class UpdateLanguageDto {
  @IsNumber()
  @IsOptional()
  employeeId?: number;

  @IsString()
  @IsOptional()
  @Length(2, 255)
  languageName?: string;

  @IsString()
  @IsOptional()
  @Length(2, 50)
  @IsIn(['Базовий', 'Середній', 'Просунутий', 'Вільний', 'Рідний'], {
    message: 'proficiencyLevel must be one of: Basic, Intermediate, Advanced, Fluent, Native'
  })
  proficiencyLevel?: string;
}