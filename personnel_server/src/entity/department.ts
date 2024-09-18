import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { Positions } from "./positions";

@Entity('department')
export class Department{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    department_name: string;

    @OneToMany(() => Positions, positions => positions.department)
    positions: Positions[];
}