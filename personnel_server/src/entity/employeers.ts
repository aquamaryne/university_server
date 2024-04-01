import { Column, PrimaryGeneratedColumn, Entity, OneToOne, OneToMany } from "typeorm";
import { Positions } from "./positions";
import { Family } from "./family";
import { Work_Experience } from "./workExperience";
import { Education } from "./education";
import { Fired } from "./fired";
import { Personal_Info } from "./personalInfo";
import { Achieve } from "./achieve";
import { Language } from "./lang";
import { Sex } from "./sex";

@Entity()
export class Employeers{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fname: string;

    @Column()
    sname: string;

    @Column()
    fatherly: string;

    @Column()
    date_of_birth: Date;

    @OneToOne(() => Positions)
    positions: Positions;

    @OneToOne(() => Family)
    family: Family;

    @OneToOne(() => Work_Experience)
    workExperience: Work_Experience;

    @OneToOne(() => Education)
    education: Education;

    @OneToOne(() => Fired)
    fired: Fired;

    @OneToOne(() => Personal_Info)
    personalInfo: Personal_Info;

    @OneToOne(() => Achieve)
    achieve: Achieve;

    @OneToOne(() => Language)
    languages: Language;

    @OneToOne(() => Sex)
    sex: Sex;
}