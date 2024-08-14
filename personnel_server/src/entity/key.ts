import { IsNotEmpty, IsString, Length } from "class-validator";
import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class A_Key {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ unique: true })
    @IsNotEmpty({ message: 'Key should be not empty' })
    @IsString({ message: 'Key must be string' })
    @Length(4, 20, { message: 'Key must be between 4 and 20 character long' })
    key: string
}