import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";

@Entity()
export class Language{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_lang_name: string;

    @Column()
    second_lang_name: string;

    @ManyToOne(() => Employeers, employeers => employeers.languages)
    employeers: Employeers;
}