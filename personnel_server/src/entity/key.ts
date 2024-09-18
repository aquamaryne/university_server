import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Auth_Key {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ 
        unique: true,
    })
    auth_key: string
}