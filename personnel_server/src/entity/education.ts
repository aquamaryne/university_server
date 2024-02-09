import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Education{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    degree_of_education: string;

    @Column()
    diploma: string;

    @Column()
    number_of_diplome: string;

    @Column()
    name_of_the_high_university: string;

    @Column()
    name_of_the_middle_university: string;

    @Column()
    employeers_id: string;
}