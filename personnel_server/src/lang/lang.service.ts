import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from 'src/entity/lang';
import { Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
@Injectable()
export class LangService implements OnModuleInit{
    constructor(@InjectRepository(Language) private languageRepository: Repository<Language>) {}

    async create(languageData: Partial<Language>): Promise<Language>{
        return this.languageRepository.save(languageData);
    }

    async findALl(): Promise<Language[]>{
        return this.languageRepository.find();
    }
    
    async findOne(id: number): Promise<Language>{
        return this.languageRepository.findOne({ where: {id} });
    }

    async update(id: number, languageData: Partial<Language>): Promise<Language>{
        await this.languageRepository.update(id, languageData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        await this.languageRepository.delete(id);
    }

    async executeDomainSqlFile(): Promise<void>{
        const filePath = path.join('sql/language.sql');
        const sql = fs.readFileSync(filePath, 'utf-8');

        await this.languageRepository.query(sql);
    }

    async onModuleInit() {
        await this.executeDomainSqlFile();
    }
}
