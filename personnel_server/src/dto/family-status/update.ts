import { IsOptional, IsString, Length } from "class-validator";

export class UpdateFamilyStatusDto{
    @IsString()
    @IsOptional()
    @Length(2, 255)
    status?: string;
}