import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Language{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_lang_name: string;

    @Column()
    second_lang_name: string;

    @Column()
    employeers_id: number;
}