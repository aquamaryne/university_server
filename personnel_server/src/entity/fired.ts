import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";
@Entity('fired')
export class Fired {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    date_of_fired: Date;
  
    @Column({ type: 'int' })
    unique_card: number;
  
    @Column({ type: 'bigint' })
    identify_code: number;
  
    @ManyToOne(() => Employeers, employeers => employeers.fired)
    employeers: Employeers;

}