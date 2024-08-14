import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateKeyDto {
    @IsNotEmpty({ message: 'Key should be not empty' })
    @IsString({ message: 'Key must be string' })
    @Length(4, 20, { message: 'Key must be between 4 and 20 characters long' })
    key: string;
}