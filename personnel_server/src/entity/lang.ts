import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from './employees';

@Entity('employee_languages')
export class EmployeeLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'employee_id', nullable: true })
  employeeId: number;

  @Column({ name: 'language_name', type: 'varchar', length: 255, nullable: true })
  languageName: string;

  @Column({ name: 'proficiency_level', type: 'varchar', length: 50, nullable: true })
  proficiencyLevel: string;

  @ManyToOne(() => Employee, employee => employee.languages)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}