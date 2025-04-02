import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Work_Experience } from 'src/entity/work-experience';
import { Repository } from 'typeorm';

@Injectable()
export class WorkExperienceService {
    constructor(@InjectRepository(Work_Experience) private workExperienceRepository: Repository<Work_Experience>) {}

    async findAll(): Promise<Work_Experience[]>{
        return this.workExperienceRepository.find();
    }

    async findOne(id: number): Promise<Work_Experience | undefined>{
        return this.workExperienceRepository.findOne({ where: {id} });
    }

    async create(data: Partial<Work_Experience>): Promise<Work_Experience>{
        const workExperience = this.workExperienceRepository.create(data);
        return this.workExperienceRepository.save(workExperience);
    }

    async update(id: number, data: Partial<Work_Experience>): Promise<Work_Experience>{
        await this.workExperienceRepository.update(id, data);
        return this.workExperienceRepository.findOne({ where: {id} });
    }

    async remove(id: number): Promise<void>{
        await this.workExperienceRepository.delete(id);
    }
}
