import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from './employees';
import { Department } from './department';
import { Positions } from './positions';
import { WorkMode } from './work-mode';

@Entity('university_employment')
export class UniversityEmployment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    name: 'employee_id', 
    nullable: true 
  })
  employeeId: number;

  @Column({ 
    name: 'department_id', 
    nullable: true 
  })
  departmentId: number;

  @Column({ 
    name: 'position_id', 
    nullable: true 
  })
  positionId: number;

  @Column({ 
    name: 'date_of_accept', 
    type: 'date', 
    nullable: true 
  })
  dateOfAccept: Date;

  @Column({ 
    name: 'date_of_position_start', 
    type: 'date', 
    nullable: true 
  })
  dateOfPositionStart: Date;

  @Column({ 
    name: 'order_number', 
    type: 'varchar', 
    length: 255, 
    nullable: true 
  })
  orderNumber: string;

  @Column({ 
    name: 'order_date', 
    type: 'date', 
    nullable: true 
  })
  orderDate: Date;

  @Column({ 
    name: 'work_mode_id', 
    nullable: true 
  })
  workModeId: number;

  @Column({ 
    name: 'total_experience_years', 
    type: 'int', 
    nullable: true 
  })
  totalExperienceYears: number;

  @Column({ 
    name: 'continuous_work_years', 
    type: 'int', 
    nullable: true 
  })
  continuousWorkYears: number;

  @Column({ 
    name: 'employment_contract', 
    type: 'varchar', 
    length: 255, 
    nullable: true 
  })
  employmentContract: string;

  @Column({ 
    name: 'employment_contract_end_date', 
    type: 'date', 
    nullable: true 
  })
  employmentContractEndDate: Date;

  @Column({ 
    name: 'previous_jobs', 
    type: 'text', 
    nullable: true 
  })
  previousJobs: string;

  @OneToOne(() => Employee, employee => employee.universityEmployment)
  @JoinColumn({ 
    name: 'employee_id' 
  })
  employee: Employee;

  @ManyToOne(() => Department, department => department.universityEmployement)
  @JoinColumn({ 
    name: 'department_id' 
  })
  department: Department;

  @ManyToOne(() => Positions, position => position.universityEmployement)
  @JoinColumn({ 
    name: 'position_id' 
  })
  position: Positions;

  @ManyToOne(() => WorkMode, workMode => workMode.univarsityEmployement)
  @JoinColumn({ 
    name: 'work_mode_id' 
  })
  workMode: WorkMode;
}