import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Department } from "./department";
import { Employeers } from "./employeers";

@Entity()
export class Positions{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 255
    })
    position_name: string;

    @Column({ 
        type: 'date',
        nullable: true
    })
    date_of_entry: Date;
    
    @Column({
        type: 'varchar',
        nullable: true
    })
    type_of_study: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    position_where_work_now: number;

    @Column({
        type: 'int',
        nullable: true,
    })
    number_of_order: number;

    @ManyToOne(() => Department, department => department.positions)
    department: Department;

    @ManyToOne(() => Employeers, (employeer) => employeer.positions)
    employeers: Employeers;
}