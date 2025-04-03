import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from './employees';
import { Achieve } from './achieve';

@Entity('employee_achievements')
export class EmployeeAchievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    name: 'employee_id', nullable: true 
  })
  employeeId: number;

  @Column({ 
    name: 'achievement_type_id', nullable: true 
  })
  achievementTypeId: number;

  @Column({ 
    name: 'date_received', type: 'date', nullable: true 
  })
  dateReceived: Date;

  @Column({ 
    type: 'text', nullable: true 
  })
  description: string;

  @Column({ 
    name: 'certificate_number', type: 'varchar', length: 255, nullable: true 
  })
  certificateNumber: string;

  @ManyToOne(() => Employee, employee => employee.achievements)
  @JoinColumn({ 
    name: 'employee_id' 
  })
  employee: Employee;

  @ManyToOne(() => Achieve, achievementType => achievementType.employeeAchievement)
  @JoinColumn({ 
    name: 'achievement_type_id' 
  })
  achievementType: Achieve;
}