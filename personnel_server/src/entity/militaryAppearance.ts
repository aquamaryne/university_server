import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Military_appearance{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accounting_group: string;

    @Column()
    accounting_category: string;

    @Column()
    depot: string;

    @Column()
    military_rank: string;

    @Column()
    military_accounting_specialty: string;

    @Column()
    num: number;

    @Column()
    suitability_for_military_service: string;

    @Column()
    name_of_the_military_office_at_the_place_of_residence: string;

    @Column()
    employeers_id: number;
}