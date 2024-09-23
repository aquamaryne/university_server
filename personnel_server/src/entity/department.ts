import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { Positions } from "./positions";

@Entity()
export class Department{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    faculty_name: string;

    @OneToMany(() => Positions, positions => positions.department)
    positions: Positions[];
}