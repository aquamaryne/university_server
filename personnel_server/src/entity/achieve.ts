import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Achieve{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    achieve_name: string;

    @Column()
    academic: string;

    @Column()
    member_of: string;
}