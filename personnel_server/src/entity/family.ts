import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { FamilyStatus } from "./familyStatus";
import { Employeers } from "./employeers";

@Entity()
export class Family{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    count_of_children: string;

    @Column()
    children_name: string;

    @Column()
    year_of_birth_children: Date;

    @Column()
    employeers_id: number;

    @Column()
    family_status_id: number;

    @ManyToOne(() => FamilyStatus, familyStatus => familyStatus.status)
    familyStatus: FamilyStatus;

    @ManyToOne(() => Employeers, employeers => employeers.family)
    employeers: Employeers;
}