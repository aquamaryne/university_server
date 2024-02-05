import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth_Keys } from './key';

@Injectable()
export class SecretKeyService {
    constructor(
        @InjectRepository(Auth_Keys) 
        private readonly keyRepository: Repository<Auth_Keys>
    ){}

    async validate_key(key: string): Promise<boolean>{
        const keyAuth = await this.keyRepository.findOne({ where: { key } });
        
        if(!keyAuth){
            throw new NotFoundException('Key not found');
        }

        return true;
    }
}
