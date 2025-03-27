import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Faculty } from "./faculty";
import { Employeers } from "./employeers";

@Entity()
export class Staff{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 255
    })
    positions_name: string;

    @Column({ 
        type: 'date',
    })
    date_of_entry: Date;
    
    @Column({
        type: 'varchar',
    })
    type_of_study: string;

    @Column({
        type: 'int',
    })
    position_where_work_now: number;

    @Column({
        type: 'int',
    })
    number_of_order: number;

    @ManyToOne(() => Employeers, (employeer) => employeer.staff_positions)
    employeers: Employeers;
}