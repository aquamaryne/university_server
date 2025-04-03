import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Employee } from "./employees";

@Entity()
export class Fired {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    employee_id: number;

    @Column()
    firing_date: Date;

    @Column()
    reason: string;

    @Column()
    order_number: string;

    @Column()
    order_date: Date;

    @Column()
    notes: string;

    @OneToOne(() => Employee, employee => employee.fired)
    @JoinColumn({
        name: 'employee_id'
    })
    employee: Employee;

}