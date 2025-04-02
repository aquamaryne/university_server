import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Employee } from './employees';

@Entity('employee_type')
export class EmployeeType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
        name: 'type_name',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    typeName: string;

    @OneToMany(() => Employee, employeers => employeers.employeeType)
    employees: Employee[];
}