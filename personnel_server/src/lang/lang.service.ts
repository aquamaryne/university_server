import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeLanguage } from 'src/entity/lang';
import { Repository } from 'typeorm';

@Injectable()
export class LangService {
    constructor(@InjectRepository(EmployeeLanguage) private languageRepository: Repository<EmployeeLanguage>) {}

    async create(languageData: Partial<EmployeeLanguage>): Promise<EmployeeLanguage>{
        return this.languageRepository.save(languageData);
    }

    async findALl(): Promise<EmployeeLanguage[]>{
        return this.languageRepository.find();
    }
    
    async findOne(id: number): Promise<EmployeeLanguage>{
        return this.languageRepository.findOne({ where: {id} });
    }

    async update(id: number, languageData: Partial<EmployeeLanguage>): Promise<EmployeeLanguage>{
        await this.languageRepository.update(id, languageData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        await this.languageRepository.delete(id);
    }
}
