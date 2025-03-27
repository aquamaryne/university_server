import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { FamilyStatus } from "./familyStatus";
import { Employeers } from "./employeers";

@Entity()
export class Family{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
    })
    count_of_children: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    children_name: string;

    @Column({
        type: 'date',
    })
    year_of_birth_children: Date;

    @ManyToOne(() => Employeers, employeers => employeers.family)
    employeers: Employeers;

    @ManyToOne(() => FamilyStatus, familyStatus => familyStatus.status)
    familyStatus: FamilyStatus;

}