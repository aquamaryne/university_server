import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { Positions } from "./positions";

@Entity()
export class Department{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    department_name: string;

    @OneToMany(() => Positions, position => position.department_id)
    positions: Positions[];
}