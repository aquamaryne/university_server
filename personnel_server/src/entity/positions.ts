import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Faculty } from "./faculty";
import { Employeers } from "./employeers";

@Entity()
export class Positions{
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
        type: 'varchar',
    })
    position_where_work_now: number;

    @Column({
        type: 'int',
    })
    number_of_order: number;

    @ManyToOne(() => Faculty, faculty => faculty.positions)
    faculty: Faculty;

    @ManyToOne(() => Employeers, (employeer) => employeer.positions)
    employeers: Employeers;

}