import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth_Key } from 'src/entity/key';

@Injectable()
export class AuthKeyService {
    constructor(@InjectRepository(Auth_Key) private authKeyRepository: Repository<Auth_Key>){}

    async create(authKey: string): Promise<Auth_Key>{
        const newAuthKey = this.authKeyRepository.create({ auth_key: authKey });
        return this.authKeyRepository.save(newAuthKey);
    }

    async validateAuthKey(authKey: string): Promise<boolean>{
        const existingAuthKey = await this.authKeyRepository.findOne({
            where: { auth_key: authKey },
        });

        return !!existingAuthKey;
    }
}
