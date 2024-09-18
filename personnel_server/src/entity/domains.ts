import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";

@Entity()
export class Domains{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    domain_name: string;

    @ManyToOne(() => Employeers, employeers => employeers.domains)
    employeers: Employeers;
}