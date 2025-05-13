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

    async validateKey(authKey: string): Promise<Auth_Key>{
        if(!authKey){
            throw new UnauthorizedException("Auth key can't be wrong");
        }

        const authKeyEntity = await this.authKeyRepository.findOne({
            where: {
                auth_key: authKey,
            }
        });

        if(!authKey){
            throw new UnauthorizedException('Wrong key auth');
        }

        return authKeyEntity;
    }

    async createdAuthKey(authKey: string): Promise<Auth_Key>{
        if(!authKey){
            throw new Error("Auth key can't be wrong");
        }

        const existingKey = await this.authKeyRepository.findOne({
            where: {
                auth_key: authKey,
            }
        });

        if(existingKey){
            return existingKey;
        }

        const newAuthKey = this.authKeyRepository.create({
            auth_key: authKey,
        });

        try{
            return await this.authKeyRepository.save(newAuthKey);
        } catch(error){
            throw new Error('Error while creating key');
        }
    }
}
