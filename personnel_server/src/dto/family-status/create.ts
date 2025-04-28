import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateFamilyStatusDto{
    @IsString()
    @IsNotEmpty()
    @Length(2, 255)
    status: string;
}