import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";
@Entity('achieve')
export class Achieve{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
        type: 'varchar', 
        length: 255 
    })
    achievement_name: string;

    @ManyToOne(() => Employeers, employeers => employeers.achievement)
    employeers: Employeers;
}