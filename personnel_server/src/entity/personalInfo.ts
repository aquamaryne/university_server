import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";
@Entity('Personal_Info')
export class Personal_Info{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
        type: 'int' 
    })
    unique_card: number;

    @Column({ 
        type: 'varchar', 
        length: 255 
    })
    serial_num_of_passport: string;

    @Column({ 
        type: 'varchar', 
        length: 255 
    })
    issued_by: string;

    @Column({ 
        type: 'date' 
    })
    date_of_issue: Date;

    @Column({ 
        type: 'varchar',
        length: 255 
    })
    place_of_living: string;

    @Column({ 
        type: 'varchar', 
        length: 255 
    })
    mobile_phone_number: string;

    @ManyToOne(() => Employeers, employeers => employeers.personal_info)
    employeers: Employeers;
}