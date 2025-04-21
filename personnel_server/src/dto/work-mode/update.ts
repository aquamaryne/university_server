import { IsOptional, IsString, Length } from "class-validator";

export class UpdateWorkModeDto{
    @IsString()
    @IsOptional()
    @Length(2, 255)
    name?: string;
}