import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Personal_Info } from 'src/entity/personal-info';
import { Repository } from 'typeorm';
@Injectable()
export class PersonalInfoService {
    constructor(@InjectRepository(Personal_Info) private personalInfoRepository: Repository<Personal_Info>) {}

    async findAll(): Promise<Personal_Info[]>{
        return this.personalInfoRepository.find();
    }

    async findOne(id: number): Promise<Personal_Info | undefined>{
        return this.personalInfoRepository.findOne({ where: {id} });
    }

    async create(data: Partial<Personal_Info>): Promise<Personal_Info>{
        const personalInfo = this.personalInfoRepository.create(data);
        return this.personalInfoRepository.save(personalInfo);
    }

    async update(id: number, data: Partial<Personal_Info>): Promise<Personal_Info>{
        await this.personalInfoRepository.update(id, data);
        return this.personalInfoRepository.findOne({ where: {id} });
    }

    async remove(id: number): Promise<void>{
        await this.personalInfoRepository.delete(id);
    }
}
