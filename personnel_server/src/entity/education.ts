import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";

@Entity()
export class Education{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    degree_of_education: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    diploma: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    number_of_diploma: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    name_of_the_high_university: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    name_of_the_middle_university: string;

    @ManyToOne(() => Employeers, (employyers) => employyers.education)
    employeers: Employeers;
}