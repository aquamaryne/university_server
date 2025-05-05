import { IsOptional, IsString, IsBoolean, Length } from "class-validator";

export class UpdatePositionDto{
    @IsString()
    @IsOptional()
    @Length(2, 255)
    name: string

    @IsBoolean()
    @IsOptional()
    isAcademic?: boolean;

    @IsBoolean()
    @IsOptional()
    isAdministrative?: boolean;
}