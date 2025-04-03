import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Employee } from './employees';

@Entity('passport_data')
export class PassportData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    name: 'employee_id', 
    nullable: true 
  })
  employeeId: number;

  @Column({ 
    type: 'varchar', 
    length: 255, 
    unique: true, 
    nullable: true 
  })
  passport: string;

  @Column({ 
    name: 'passport_issued_by', 
    type: 'varchar', 
    length: 255, 
    nullable: true 
  })
  passportIssuedBy: string;

  @Column({ 
    name: 'passport_date_issued', 
    type: 'date', 
    nullable: true 
  })
  passportDateIssued: Date;

  @OneToOne(() => Employee, employee => employee.passportData)
  @JoinColumn({ 
    name: 'employee_id' 
  })
  employee: Employee;
}