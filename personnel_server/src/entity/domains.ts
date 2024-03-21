import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Positions } from "./positions";

@Entity()
export class Domains{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    domain_name: string;

    @ManyToOne(() => Positions, position => position.department_id)
    position: Positions;
}