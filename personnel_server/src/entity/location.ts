import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PersonalInfo } from './personal-info';

@Entity('location')
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string;

    @OneToMany(() => PersonalInfo, personalInfo => personalInfo.birthPlace)
    birthPlace: PersonalInfo[];
}