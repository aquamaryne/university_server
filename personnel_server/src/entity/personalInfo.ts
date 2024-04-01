import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";

@Entity()
export class Personal_Info{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    unique_card: number;

    @Column({ unique: true })
    serial_num_of_passport: string;

    @Column()
    issued_by: string;

    @Column()
    place_of_living: string;

    @Column({ unique: true })
    mobile_phone_number: string;

    @ManyToOne(() => Employeers, employeers => employeers.personalInfo)
    employeers: Employeers;
}