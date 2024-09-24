import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Domains } from 'src/entity/domains';
import { Repository } from 'typeorm';

@Injectable()
export class DomainsService  {
    constructor(@InjectRepository(Domains) private readonly domainsRepository: Repository<Domains>) {}

    async findAll(): Promise<Domains[]>{
        return this.domainsRepository.find()
    }

    async findOne(id: number): Promise<Domains | undefined>{
        return this.domainsRepository.findOne({ where: {id} });
    }

    async create(data: Partial<Domains>): Promise<Domains>{
        const domains = this.domainsRepository.create(data)
        return this.domainsRepository.save(data);
    }

    async update(id: number, data: Partial<Domains>): Promise<Domains>{
        await this.domainsRepository.update(id, data);
        return this.domainsRepository.findOne({ where: {id} });
    }

    async remove(id: number): Promise<void>{
        await this.domainsRepository.delete(id);
    }
}
