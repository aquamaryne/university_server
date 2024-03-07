import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class A_Key {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ unique: true })
    key: string
}