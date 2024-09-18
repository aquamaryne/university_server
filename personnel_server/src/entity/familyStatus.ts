import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { Family } from "./family";
@Entity('family_status')
export class FamilyStatus{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    status: string;

    @OneToMany(() => Family, family => family.familyStatus)
    family: Family[];
}