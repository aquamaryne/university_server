import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, OneToMany } from "typeorm";

@Entity()
export class Employeers{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fname: string;

    @Column()
    sname: string;

    @Column()
    fatherly: string;

    @Column()
    date_of_birth: Date;

    @Column()
    positions_id: number;

    @Column()
    family_id: number;

    @Column()
    work_experience: number;

    @Column()
    education_id: number;

    
}