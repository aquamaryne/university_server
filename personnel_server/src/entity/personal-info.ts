import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Employee } from "./employees";
import { Location } from "./location";
import { FamilyStatus } from "./family-status";

@Entity('personal_info')
export class PersonalInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'employee_id',
        nullable: true
    })
    employeeId: number;

    @Column({
        name: 'birth_place_id',
        nullable: true,
    })
    birthPlaceId: number;

    @Column({
        name: 'home_address', 
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    homeAddress: string;

    @Column({
        name: 'phone_number',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    phoneNumber: string

    @Column({
        name: 'is_part_timer',
        type: 'varchar',
        length: 255,
        default: false
    })
    isPartTimer: boolean;

    @Column({
        name: 'is_university_education',
        type: 'boolean',
        default: false
    })
    isUniversityEducation: boolean;

    @OneToMany(() => Employee, employee => employee.personalInfo)
    @JoinColumn({
        name: 'employee_id'
    })
    employee: Employee;

    @ManyToOne(() => Location, location => location.personalInfo)
    @JoinColumn({
        name: 'birth_place_id'
    })
    birthPlace: Location;

    @ManyToOne(() => FamilyStatus, familyStatus => familyStatus.status)
    @JoinColumn({
        name: 'family_status_id'
    })
    familyStatus: FamilyStatus;
}