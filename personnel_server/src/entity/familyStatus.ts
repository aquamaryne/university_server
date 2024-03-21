import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class FamilyStatus{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;
}