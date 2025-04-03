import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalInfo } from 'src/entity/personal-info';
import { Repository } from 'typeorm';
@Injectable()
export class PersonalInfoService {
    constructor(@InjectRepository(PersonalInfo) private personalInfoRepository: Repository<PersonalInfo>) {}

    async findAll(): Promise<PersonalInfo[]>{
        return this.personalInfoRepository.find();
    }

    async findOne(id: number): Promise<PersonalInfo | undefined>{
        return this.personalInfoRepository.findOne({ where: {id} });
    }

    async create(data: Partial<PersonalInfo>): Promise<PersonalInfo>{
        const personalInfo = this.personalInfoRepository.create(data);
        return this.personalInfoRepository.save(personalInfo);
    }

    async update(id: number, data: Partial<PersonalInfo>): Promise<PersonalInfo>{
        await this.personalInfoRepository.update(id, data);
        return this.personalInfoRepository.findOne({ where: {id} });
    }

    async remove(id: number): Promise<void>{
        await this.personalInfoRepository.delete(id);
    }
}
