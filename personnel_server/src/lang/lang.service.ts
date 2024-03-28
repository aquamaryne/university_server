import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from 'src/entity/lang';
import { Repository } from 'typeorm';

@Injectable()
export class LangService {
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
}
