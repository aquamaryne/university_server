import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from './employees';

@Entity('teacher_disciplines')
export class TeacherDiscipline {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'employee_id', nullable: true })
  employeeId: number;

  @Column({ name: 'discipline_name', type: 'varchar', length: 255, nullable: true })
  disciplineName: string;

  @ManyToOne(() => Employee, employee => employee.teacherDisciplines)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}