import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A_Key } from 'src/entity/key';
import { CreateKeyDto } from 'src/dto/create-key.data';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(A_Key) private readonly keyRepo: Repository<A_Key>){}

    async create(createKeyDto: CreateKeyDto): Promise<A_Key>{
        const key = this.keyRepo.create(createKeyDto);
        return this.keyRepo.save(key);
    }
}
