import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Language{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    first_lang_name: string;

    @Column({ nullable: true })
    second_lang_name: string;

    @Column({ nullable: true })
    language_name: string
}