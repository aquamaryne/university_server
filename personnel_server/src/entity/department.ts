import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";
import { Faculty } from "./faculty";

@Entity()
export class Department{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    department_name: string;

    @ManyToOne(() => Faculty, faculty => faculty.departments)
    faculty: Faculty;
}