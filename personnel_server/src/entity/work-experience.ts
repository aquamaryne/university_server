import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from './employees';

@Entity('work_experience')
export class WorkExperience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'employee_id', nullable: true })
  employeeId: number;

  @Column({ name: 'workplace_name', type: 'varchar', length: 255, nullable: true })
  workplaceName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  position: string;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date;

  @Column({ name: 'reason_of_leaving', type: 'varchar', length: 255, nullable: true })
  reasonOfLeaving: string;

  @ManyToOne(() => Employee, employee => employee.workExperiences)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}