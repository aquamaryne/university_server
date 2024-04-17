import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Sex{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sex_name: string;
}