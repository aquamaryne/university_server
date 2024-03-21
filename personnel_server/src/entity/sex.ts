import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";

@Entity()
export class Sex{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sex_name: string;

    @ManyToOne(() => Employeers, employeers => employeers.sex)
    employeers: Employeers;
}