import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Auth_Keys {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ unique: true })
    auth_keys: string
}