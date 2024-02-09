import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth_Keys } from '../entity/key';

@Injectable()
export class SecretKeyService {
    constructor(
        @InjectRepository(Auth_Keys)
        private readonly keyRepository: Repository<any>
    ){}

    async validateKey(keyValue: string): Promise<boolean>{
        const key = await this.keyRepository.findOne({ where: { keyValue } });
        return !!key;
    }
}
