import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Employeers } from "./employeers";

@Entity()
export class Vacation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'date'
    })
    start_date: Date;

    @Column({
        type: 'date'
    })
    end_date: Date;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    notes: string;

    @ManyToOne(() => Employeers)
    employeers: Employeers;
}