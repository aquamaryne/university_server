import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { Positions } from "./positions";

@Entity()
export class Faculty{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    faculty_name: string;

    @OneToMany(() => Positions, positions => positions.faculty)
    positions: Positions[];
}