import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateLocationDto {
  @IsString()
  @IsOptional()
  @Length(2, 255)
  name?: string;
}