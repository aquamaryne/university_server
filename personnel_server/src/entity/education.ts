import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Education{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    degree_of_education: string;

    @Column()
    academic_title: string; 

    @Column()
    diploma: string;

    @Column()
    number_of_diploma: string;

    @Column()
    name_of_the_high_university: string;

    @Column()
    name_of_the_middle_university: string;
}