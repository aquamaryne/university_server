import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Positions{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    position_name: string;

    @Column()
    date_of_entry: Date;
    
    @Column()
    type_of_study: number;

    @Column()
    position_where_work_now: number;

    @Column({ unique: true })
    number_of_order: number;

    @Column()
    department_id: number;

    @Column()
    employeers_id: number
}