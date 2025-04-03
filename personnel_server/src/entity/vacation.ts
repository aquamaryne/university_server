import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Employee } from "./employees";

@Entity('vacation')
export class Vacation{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    employee_id: number;

    @Column()
    vacation_type: string;

    @Column()
    start_date: Date;

    @Column()
    end_Date: Date;

    @Column()
    order_number: number;

    @Column()
    order_date: Date;

    @Column()
    is_paid: boolean;

    @Column()
    notes: string

    @OneToMany(() => Vacation, vacation => vacation.employee)
    vacation: Vacation[];

    @ManyToOne(() => Employee, emplyee => emplyee.vacation)
    @JoinColumn({
        name: 'employee_id'
    })
    employee: Employee[];
}