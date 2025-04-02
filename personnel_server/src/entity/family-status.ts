import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { PersonalInfo } from "./personal-info";

@Entity("family_status")
export class FamilyStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false,
    })
    status: string;

    @OneToMany(() => PersonalInfo, (personalInfo) => personalInfo.familyStatus)
    familyStatus: PersonalInfo[];
}