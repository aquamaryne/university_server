import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateLocationDto{
    @IsString()
    @IsNotEmpty()
    @Length(2, 255)
    name: string;
}