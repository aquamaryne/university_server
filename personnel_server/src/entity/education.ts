import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from './employees';

@Entity('education')
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'employee_id', nullable: true })
  employeeId: number;

  @Column({ name: 'degree_of_education', type: 'varchar', length: 255, nullable: false })
  degreeOfEducation: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  diploma: string;

  @Column({ name: 'number_of_diploma', type: 'varchar', length: 255, nullable: false })
  numberOfDiploma: string;

  @Column({ name: 'name_of_end_high_university', type: 'varchar', length: 255, nullable: true })
  nameOfEndHighUniversity: string;

  @Column({ name: 'name_of_end_middle_university', type: 'varchar', length: 255, nullable: true })
  nameOfEndMiddleUniversity: string;

  @Column({ name: 'graduation_year', type: 'int', nullable: true })
  graduationYear: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  specialty: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  qualification: string;

  @ManyToOne(() => Employee, employee => employee.educations)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}