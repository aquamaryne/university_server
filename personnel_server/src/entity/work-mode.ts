import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UniversityEmployment } from "./university-employment";

@Entity('work-mode')
export class WorkMode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string

    @OneToMany(() => UniversityEmployment, universityEmployement => universityEmployement.workMode)
    univarsityEmployement: UniversityEmployment[];
}