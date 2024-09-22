import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";

@Entity()
export class Language{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
        type: 'varchar',
        length: 255    
    })
    language: string;

    @ManyToOne(() => Employeers, employeers => employeers.languages)
    employeers: Employeers;
}