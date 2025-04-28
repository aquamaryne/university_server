import { IsNotEmpty, IsOptional, IsNumber, IsString, Length } from "class-validator";

export class CreateFamilyDto{
    @IsNumber()
    @IsNotEmpty()
    emplyeedId: number;

    @IsString()
    @IsNotEmpty()
    @Length(2, 255)
    relationType: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 255)
    fullName: string;
}