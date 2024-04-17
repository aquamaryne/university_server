import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Fired {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date_of_fired: Date;

    @Column({ unique: true })
    unique_card: string;

    @Column({ unique: true })
    identify_code: number;

}