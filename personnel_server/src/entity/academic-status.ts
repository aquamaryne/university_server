import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Employee } from './employees';

@Entity('academic_status')
export class AcademicStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'employee_id', nullable: true })
  employeeId: number;

  @Column({ name: 'is_candidate', type: 'boolean', default: false })
  isCandidate: boolean;

  @Column({ name: 'is_doctor', type: 'boolean', default: false })
  isDoctor: boolean;

  @Column({ name: 'is_academic', type: 'boolean', default: false })
  isAcademic: boolean;

  @Column({ name: 'total_academic_experience', type: 'int', nullable: true })
  totalAcademicExperience: number;

  @Column({ name: 'institute_academic_experience', type: 'int', nullable: true })
  instituteAcademicExperience: number;

  @Column({ name: 'year_of_qualification_improvement', type: 'int', nullable: true })
  yearOfQualificationImprovement: number;

  @OneToOne(() => Employee, employee => employee.academicStatus)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}