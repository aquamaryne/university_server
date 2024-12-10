import { Column, PrimaryGeneratedColumn, Entity, OneToMany, DeleteDateColumn } from "typeorm";
import { Positions } from "./positions";
import { Family } from "./family";
import { Work_Experience } from "./workExperience";
import { Personal_Info } from "./personalInfo";
import { Education } from "./education";
import { Fired } from "./fired";
import { Achieve } from "./achieve";
import { Language } from "./lang";
import { Sex } from "./sex";
import { Domains } from "./domains";
@Entity()
export class Employeers{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: true })
    fname: string;

    @Column({ nullable: true })
    sname: string;

    @Column({ nullable: true })
    fatherly: string;

    @Column({ 
        type: 'varchar', 
        length: 255, 
        unique: true,
    })
    unique_card: string;

    @Column({ type: 'date', nullable: true })
    date_of_birth: Date;

    @OneToMany(() => Positions, positions => positions.employeers)
    positions: Positions[];

    @OneToMany(() => Family, family => family.employeers)
    family: Family[];

    @OneToMany(() => Work_Experience, workExperience => workExperience.employeers)
    work_experience: Work_Experience[];

    @OneToMany(() => Education, education => education.employeers)
    education: Education[];

    @OneToMany(() => Personal_Info, personalInfo => personalInfo.employeers)
    personal_info: Personal_Info[];

    @OneToMany(() => Fired, fired => fired.employeers)
    fired: Fired[];

    @OneToMany(() => Achieve, achieve => achieve.employeers)
    achievement: Achieve[];

    @OneToMany(() => Language, languages => languages.employeers)
    languages: Language[];

    @OneToMany(() => Sex, sex => sex.employeers)
    sex: Sex[];

    @OneToMany(() => Domains, domains => domains.employeers)
    domains: Domains[];
}