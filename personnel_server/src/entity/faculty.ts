import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { Department } from "./department";

@Entity("faculty")
export class Faculty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        name: 'faculty_name',
        length: 255,
        nullable: false,
    })
    faculty_name: string;

    @Column({
        type: 'varchar',
        name: 'short_name',
        length: 255,
        nullable: true,
    })
    short_name: string;

    @OneToMany(() => Department, (department) => department.faculty)
    departments: Department[];
}