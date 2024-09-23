import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";
@Entity()
export class Achieve{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
        type: 'varchar', 
        length: 255,
        nullable: true,
    })
    achievement_name: string;

    @ManyToOne(() => Employeers, employeers => employeers.achievement)
    employeers: Employeers;
}