import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth_Key } from 'src/entity/key';

@Injectable()
export class AuthKeyService {
    constructor(
        @InjectRepository(Auth_Key) 
        private authKeyRepository: Repository<Auth_Key>,
    ){}

    async validateAuthKey(authKey: string): Promise<Auth_Key>{
        const authKeyEntity = await this.authKeyRepository.findOne({ where: { auth_key: authKey }});

        if(!authKeyEntity){
            throw new UnauthorizedException('Invalid authentication key');
        }

        return authKeyEntity;
    }

    async createAuthKey(authKey: string): Promise<Auth_Key>{
        const newAuthKey = this.authKeyRepository.create({ auth_key: authKey });
        try{
            return this.authKeyRepository.save(newAuthKey);
        } catch (error){
            throw new Error('Failed to create key');
        }
    }
}
