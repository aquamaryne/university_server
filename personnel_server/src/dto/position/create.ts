import { IsNotEmpty, IsOptional, IsString, IsBoolean, Length } from "class-validator";

export class CreatePositionDto{
    @IsString()
    @IsNotEmpty()
    @Length(2, 255)
    name: string

    @IsBoolean()
    @IsOptional()
    isAcademic?: boolean;

    @IsBoolean()
    @IsOptional()
    isAdministrative?: boolean;
}