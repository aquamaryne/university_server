import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from 'src/entity/education';

@Injectable()
export class EducationService {
    constructor(
        @InjectRepository(Education)
        private readonly educationRepository: Repository<Education>,
    ) {}

    async create(educationData: Partial<Education>): Promise<Education>{
        const education =  await this.educationRepository.create(educationData)
        return this.educationRepository.save(education)
    }

    async findAll(): Promise<Education[]>{
        return this.educationRepository.find();
    }

    async findOne(id: number): Promise<Education>{
        return this.educationRepository.findOne({ where: {id} });
    }

    async update(id: number, educationData: Partial<Education>): Promise<Education>{
        await this.educationRepository.update(id, educationData);
        return this.educationRepository.findOne({ where: {id} })
    }

    async remove(id: number): Promise<void>{
        await this.educationRepository.delete(id)
    }
}
