import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Department{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    department_name: string;
}