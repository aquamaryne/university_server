import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { FamilyStatus } from "./familyStatus";

@Entity()
export class Family{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    count_of_children: string;

    @Column()
    children_name: string;

    @Column()
    year_of_birth_children: Date;

    @ManyToOne(() => FamilyStatus, familyStatus => familyStatus.status)
    familyStatus: FamilyStatus;

}