import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";

@Entity()
export class Fired {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date_of_fired: Date;

    @Column({ unique: true })
    unique_card: string;

    @Column({ unique: true })
    identify_code: number;

    @ManyToOne(() => Employeers, employeers => employeers.fired)
    employeers: Employeers;
}