import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UniversityEmployment } from "./university-employment";

export class WorkMode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    @OneToMany(() => UniversityEmployment, universityEmployement => universityEmployement.workMode)
    univarsityEmployement: UniversityEmployment[];
}