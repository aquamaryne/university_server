import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Achieve{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    achieve_name: string;

    @Column()
    honory_title: string;

    @Column()
    meritorious_title: string;

    @Column()
    state_awards: string;

    @Column()
    honored_scientist: string;

    @Column()
    other_honors: string;

    @Column()
    academic: string;

    @Column()
    member_of: string;
}