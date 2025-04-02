import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { EmployeeType } from './employee-type';
import { PersonalInfo } from './personal-info';
import { PassportData } from './passport-data';
import { AcademicStatus } from './academic-status';
import { EmployeeAchievement } from './employee-achivement';
import { Family } from './family';
import { Education } from './education';
import { WorkExperience } from './work-experience';
import { UniversityEmployment } from './university-employment';
import { TeacherDiscipline } from './teacher-discipline';
import { EmployeeLanguage } from './lang';
import { Staff } from './staff';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'identify_number', type: 'int', unique: true, nullable: true })
  identifyNumber: number;

  @Column({ name: 'unique_card', type: 'varchar', length: 255, unique: true, nullable: true })
  uniqueCard: string;

  @Column({ name: 'personal_card_number', type: 'varchar', length: 50, unique: true, nullable: true })
  personalCardNumber: string;

  @Column({ name: 'first_name', type: 'varchar', length: 255, nullable: false })
  firstName: string;

  @Column({ name: 'second_name', type: 'varchar', length: 255, nullable: false })
  secondName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fatherly: string;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 10, nullable: true })
  sex: string;

  @Column({ name: 'employee_type_id', nullable: true })
  employeeTypeId: number;

  @Column({ name: 'date_of_enter_card', type: 'date', nullable: true })
  dateOfEnterCard: Date;

  @ManyToOne(() => EmployeeType, employeeType => employeeType.employees)
  @JoinColumn({ name: 'employee_type_id' })
  employeeType: EmployeeType;

  @OneToOne(() => PersonalInfo, personalInfo => personalInfo.employee)
  personalInfo: PersonalInfo;

  @OneToOne(() => PassportData, passportData => passportData.employee)
  passportData: PassportData;

  @OneToOne(() => AcademicStatus, academicStatus => academicStatus.employee)
  academicStatus: AcademicStatus;

  @OneToMany(() => EmployeeAchievement, achievement => achievement.employee)
  achievements: EmployeeAchievement[];

  @OneToMany(() => Family, familyMember => familyMember.employee)
  familyMembers: Family[];

  @OneToMany(() => Education, education => education.employee)
  educations: Education[];

  @OneToMany(() => WorkExperience, workExperience => workExperience.employee)
  workExperiences: WorkExperience[];

  @OneToOne(() => UniversityEmployment, universityEmployment => universityEmployment.employee)
  universityEmployment: UniversityEmployment;

  @OneToMany(() => TeacherDiscipline, teacherDiscipline => teacherDiscipline.employee)
  teacherDisciplines: TeacherDiscipline[];

  @OneToMany(() => EmployeeLanguage, employeeLanguage => employeeLanguage.employee)
  languages: EmployeeLanguage[];

  @OneToOne(() => Staff, staff => staff.employee)
  staff: Staff;
}
