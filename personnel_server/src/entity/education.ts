import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";

@Entity()
export class Education{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    degree_of_education: string;

    @Column()
    diploma: string;

    @Column()
    number_of_diploma: string;

    @Column()
    name_of_the_high_university: string;

    @Column()
    name_of_the_middle_university: string;

    @ManyToOne(() => Employeers, employeers => employeers.education)
    employeers: Employeers;
}