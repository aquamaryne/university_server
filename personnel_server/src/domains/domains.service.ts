import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Domains } from 'src/entity/domains';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class DomainsService implements OnModuleInit {
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

    async executeDomainSqlFile(): Promise<void>{
        const filePath = path.join('sql/domains.sql');
        const sql = fs.readFileSync(filePath, 'utf-8');

        await this.domainsRepository.query(sql);
    }

    async onModuleInit() {
        await this.executeDomainSqlFile();
    }
}
