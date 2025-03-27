import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Faculty } from "./faculty";
import { Staff } from "./staff";

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
        type: 'int',
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

    @ManyToOne(() => Staff, staff => staff.positions_name)
    staff: Staff[];

}