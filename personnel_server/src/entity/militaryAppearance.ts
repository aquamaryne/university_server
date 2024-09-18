import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";

@Entity()
export class Military_Appearance{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    accounting_group: string;

    @Column({ type: 'varchar', length: 255 })
    accounting_category: string;

    @Column({ type: 'varchar', length: 255 })
    depot: string;

    @Column({ type: 'varchar', length: 255 })
    military_rank: string;

    @Column({ type: 'varchar', length: 255 })
    military_accounting_specialty: string;

    @Column({ type: 'int' })
    num: number;

    @Column({ type: 'varchar', length: 255 })
    suitability_for_military_service: string;

    @Column({ type: 'varchar', length: 255 })
    name_of_military_office_at_the_place_of_residence: string;

    @ManyToOne(() => Employeers, employeers => employeers.military_appearance)
    employeers: Employeers;
}