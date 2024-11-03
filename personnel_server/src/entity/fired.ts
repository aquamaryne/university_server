import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";
@Entity()
export class Fired {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    date_of_fired: Date;
  
    @ManyToOne(() => Employeers, employeers => employeers.fired)
    employeers: Employeers;

}