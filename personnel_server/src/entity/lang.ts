import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";

@Entity('lang')
export class Language{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
        type: 'varchar',
        length: 255    
    })
    first_lang_name: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    second_lang_name: string;

    @ManyToOne(() => Employeers, employeers => employeers.languages)
    employeers: Employeers;
}