import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";

@Entity('work_expience')
export class Work_Experience{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int'
    })
    global_work_exp: number;

    @Column({
        type: 'int'
    })
    global_science_exp: number;

    @Column({
        type: 'int'
    })
    science_in_this_university: number;

    @Column({
        type: 'date'
    })
    continuous_work_exp: Date;

    @ManyToOne(() => Employeers, employeers => employeers.work_experience)
    employeers: Employeers;
}