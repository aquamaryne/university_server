import { IsOptional, IsString, Length } from "class-validator";

export class UpdateAchieveDto {
    @IsString()
    @IsOptional()
    @Length(1, 255)
    name?: string;
}