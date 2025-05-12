import { Column, PrimaryGeneratedColumn, Entity, BeforeInsert } from "typeorm";
import * as bcrypt from "bcrypt";
@Entity()
export class Auth_Key {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ 
        unique: true,
    })
    auth_key: string

    @BeforeInsert()
    async password(): Promise<void>{
        if(!this.auth_key) return;

        const bcryptRegex = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;
        const isAlreadyHashed = bcryptRegex.test(this.auth_key);

        if(isAlreadyHashed) return;

        const salt = await bcrypt.genSalt(10);
        this.auth_key = await bcrypt.hash(this.auth_key, salt);
    }
}