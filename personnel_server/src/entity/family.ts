import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from './employees';

@Entity('family_members')
export class Family {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    name: 'employee_id', 
    nullable: true 
  })
  employeeId: number;

  @Column({ 
    name: 'relation_type',
    type: 'varchar', 
    length: 255, 
    nullable: true 
  })
  relationType: string;

  @Column({ 
    name: 'full_name', 
    type: 'varchar', 
    length: 255, 
    nullable: true 
  })
  fullName: string;

  @ManyToOne(() => Employee, employee => employee.familyMembers)
  @JoinColumn({ 
    name: 'employee_id' 
  })
  employee: Employee;
}