import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";

@Entity()
export class Work_Experience{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    global_work_exp: number;

    @Column()
    global_science_exp: number;

    @Column()
    science_in_this_university: number;

    @Column()
    continuous_work_exp: Date;

    @ManyToOne(() => Employeers, employeers => employeers.workExperience)
    employeers: Employeers;
}