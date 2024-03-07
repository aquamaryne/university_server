import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A_Key } from '../entity/key';

@Injectable()
export class SecretKeyService {
    constructor(
        @InjectRepository(A_Key)
        private readonly keyRepository: Repository<any>
    ){}

    async validateKey(key: string): Promise<boolean>{
        const foundKey = await this.keyRepository.findOne({ where: { key } });
        return !!foundKey;
    }
}
