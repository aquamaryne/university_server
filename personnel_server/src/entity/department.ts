import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Faculty } from "./faculty";
import { UniversityEmployment } from "./university-employment";
import { Staff } from "./staff";

@Entity("department")
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false,
    })
    name: string;

    @Column({
        name: "short_name",
        type: "varchar",
        length: 50,
        nullable: false,
    })
    shortName: string;

    @Column({
        name: "faculty_id",
        nullable: true,
    })
    facultyId: number;

    @ManyToOne(() => Faculty, faculty => faculty.departments)
    @JoinColumn({
        name: "faculty_id",
    })
    faculty: Faculty;

    @OneToMany(() => UniversityEmployment, universityEmployement => universityEmployement.department)
    universityEmployement: UniversityEmployment[];

    @OneToMany(() => Staff, staff => staff.department)
    staffMembers: Staff[];

}