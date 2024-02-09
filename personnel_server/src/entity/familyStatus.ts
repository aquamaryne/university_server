import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Family_status{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;
}