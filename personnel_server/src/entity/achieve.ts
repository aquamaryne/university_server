import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { EmployeeAchievement } from "./employee-achivement";

@Entity("achieve")
export class Achieve {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false,
    })
    name: string;

    @OneToMany(() => EmployeeAchievement, achievement => achievement.achievementType)
    employeeAchievement: EmployeeAchievement[];
}