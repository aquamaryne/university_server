import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FamilyStatus } from 'src/entity/familyStatus';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class FamilyStatusService implements OnModuleInit{
    constructor(@InjectRepository(FamilyStatus) private familyStatusRepository: Repository<FamilyStatus>) {}

    async findAll(): Promise<FamilyStatus[]>{
        return this.familyStatusRepository.find();
    }

    async findOne(id: number): Promise<FamilyStatus | undefined>{
        return this.familyStatusRepository.findOne({ where: {id} });
    } 

    async create(data: Partial<FamilyStatus>): Promise<FamilyStatus>{
        const familyStatus = this.familyStatusRepository.create(data);
        return this.familyStatusRepository.save(familyStatus);
    }

    async update(id: number, data: Partial<FamilyStatus>): Promise<FamilyStatus>{
        await this.familyStatusRepository.update(id, data);
        return this.familyStatusRepository.findOne({ where: {id} });
    }

    async remove(id: number): Promise<void>{
        await this.familyStatusRepository.delete(id);
    }

    async executeDomainSqlFile(): Promise<void>{
        const filePath = path.join('sql/family_status.sql');
        const sql = fs.readFileSync(filePath, 'utf-8');

        await this.familyStatusRepository.query(sql);
    }

    async onModuleInit() {
        await this.executeDomainSqlFile();
    }
}