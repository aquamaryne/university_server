import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Department } from "./department";

@Entity()
export class Positions{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    position_name: string;

    @Column({ type: 'date' })
    date_of_entry: Date;
    
    @Column()
    type_of_study: number;

    @Column()
    position_where_work_now: number;

    @Column({ unique: true })
    number_of_order: number;

    @ManyToOne(() => Department, department => department.positions)
    department: Department;
}