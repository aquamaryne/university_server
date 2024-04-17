import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from "typeorm";
import { Positions } from "./positions";
import { Family } from "./family";
import { Work_Experience } from "./workExperience";
import { Education } from "./education";
import { Fired } from "./fired";
import { Personal_Info } from "./personalInfo";
import { Achieve } from "./achieve";
import { Language } from "./lang";
import { Sex } from "./sex";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Employeers{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: true })
    @IsNotEmpty()
    fname: string;

    @Column({ nullable: true })
    @IsNotEmpty()
    sname: string;

    @Column({ nullable: true })
    @IsNotEmpty()
    fatherly: string;

    @Column({ nullable: true })
    @IsNotEmpty()
    date_of_birth: Date;

    @Column({ nullable: true })
    positionId: number;

    @Column({ nullable: true })
    familyId: number;

    @Column({ nullable: true })
    workExperienceId: number;

    @Column({ nullable: true })
    educationId: number;

    @Column({ nullable: true })
    firedId: number;

    @Column({ nullable: true })
    personalInfoId: number;

    @Column({ nullable: true })
    achieveId: number;

    @Column({ nullable: true })
    languagesId: number;

    @Column({ nullable: true })
    sexId: number;

    @ManyToOne(() => Positions)
    @JoinColumn({ name: 'positionId' })
    positions: Positions;

    @ManyToOne(() => Family)
    @JoinColumn({ name: 'familyId' })
    family: Family;

    @ManyToOne(() => Work_Experience)
    @JoinColumn({ name: 'workExperienceId' })
    workExperience: Work_Experience;

    @ManyToOne(() => Education)
    @JoinColumn({ name: 'educationId' })
    education: Education;

    @ManyToOne(() => Fired)
    @JoinColumn({ name: 'firedId' })
    fired: Fired;

    @ManyToOne(() => Personal_Info)
    @JoinColumn({ name: 'personalInfoId' })
    personalInfo: Personal_Info;

    @ManyToOne(() => Achieve)
    @JoinColumn({ name: 'achieveId' })
    achieve: Achieve;

    @ManyToOne(() => Language)
    @JoinColumn({ name: 'languagesId' })
    languages: Language;

    @ManyToOne(() => Sex)
    @JoinColumn({ name: 'sexId' })
    sex: Sex;
}