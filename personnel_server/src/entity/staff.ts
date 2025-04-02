import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from './employees';
import { Department } from './department';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'employee_id', nullable: true })
  employeeId: number;

  @Column({ name: 'staff_category', type: 'varchar', length: 255, nullable: true })
  staffCategory: string;

  @Column({ name: 'department_id', nullable: true })
  departmentId: number;

  @OneToOne(() => Employee, employee => employee.staff)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => Department, department => department.staffMembers)
  @JoinColumn({ name: 'department_id' })
  department: Department;
}