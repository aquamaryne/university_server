import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeLanguage } from 'src/entity/lang';
import { Repository } from 'typeorm';
import { CreateLanguageDto } from 'src/dto/lang/create';
import { UpdateLanguageDto } from 'src/dto/lang/update';
import { LanguageResponceDto } from 'src/dto/lang/responce';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class LangService {
    constructor(@InjectRepository(EmployeeLanguage) private languageRepository: Repository<EmployeeLanguage>) {}

    async create(createLanguageDto: CreateLanguageDto): Promise<EmployeeLanguage>{
        const language = this.languageRepository.create(createLanguageDto);
        const savedLanguage = await this.languageRepository.save(language);
        return this.findOne(savedLanguage.id);
    }

    async findALl(): Promise<EmployeeLanguage[]>{
        return this.languageRepository.find({
            relations: ['employee']
        });
    }
    
    async findOne(id: number): Promise<EmployeeLanguage>{
        const language = await this.languageRepository.findOne({
            where: { id },
            relations: ['employee']
        });

        if(!language){
            throw new NotFoundException(`Language with ID ${id} not found`);
        }

        return language;
    }

    async update(id: number, updateLanguageDto: UpdateLanguageDto): Promise<EmployeeLanguage>{
        const language = await this.findOne(id);
        Object.assign(language, updateLanguageDto);
        await this.languageRepository.save(language);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        const language = await this.findOne(id);
        await this.languageRepository.remove(language);
    }

    toResponseDto(language: EmployeeLanguage): LanguageResponceDto {
        return plainToInstance(LanguageResponceDto, language, {
            excludeExtraneousValues: true,
        })
    }
}
