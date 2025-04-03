import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkExperience } from 'src/entity/work-experience';
import { Repository } from 'typeorm';

@Injectable()
export class WorkExperienceService {
    constructor(@InjectRepository(WorkExperience) private workExperienceRepository: Repository<WorkExperience>) {}

    async findAll(): Promise<WorkExperience[]>{
        return this.workExperienceRepository.find();
    }

    async findOne(id: number): Promise<WorkExperience | undefined>{
        return this.workExperienceRepository.findOne({ where: {id} });
    }

    async create(data: Partial<WorkExperience>): Promise<WorkExperience>{
        const workExperience = this.workExperienceRepository.create(data);
        return this.workExperienceRepository.save(workExperience);
    }

    async update(id: number, data: Partial<WorkExperience>): Promise<WorkExperience>{
        await this.workExperienceRepository.update(id, data);
        return this.workExperienceRepository.findOne({ where: {id} });
    }

    async remove(id: number): Promise<void>{
        await this.workExperienceRepository.delete(id);
    }
}
