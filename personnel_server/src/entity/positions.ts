import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UniversityEmployment } from "./university-employment";

@Entity("positions")
export class Positions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false,
    })
    name: string;

    @Column({
        name: 'is_academic',
        type: 'boolean',
        default: false,
    })
    isAcademic: boolean;

    @Column({
        name: 'is_admin',
        type: 'boolean',
        default: false,
    })
    isAdministrative: boolean;

    @OneToMany(() => UniversityEmployment, universityEmployement => universityEmployement.position)
    universityEmployement: UniversityEmployment[];
}