import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Domains{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    domain_name: string;

    @Column()
    emplyeers_id: number;
}