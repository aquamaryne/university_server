import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkExperience } from 'src/entity/work-experience';
import { Repository } from 'typeorm';
import { CreateWorkExperienceDto } from 'src/dto/work-experience/create';
import { UpdateWorkExperienceDto } from 'src/dto/work-experience/update';
import { WorkExperienceResponceDto } from 'src/dto/work-experience/responce';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class WorkExperienceService {
    constructor(@InjectRepository(WorkExperience) private workExperienceRepository: Repository<WorkExperience>) {}

    async findAll(): Promise<WorkExperienceResponceDto[]>{
        const experiences = await this.workExperienceRepository.find({
            relations: ['employee']
        })

        return plainToInstance(WorkExperienceResponceDto, experiences, {
            excludeExtraneousValues: true,
        })
    }

    async findOne(id: number): Promise<WorkExperienceResponceDto>{
        const experience = await this.workExperienceRepository.findOne({ 
            where: { id },
            relations: ['employee'], 
        });

        if(!experience){
            throw new NotFoundException(`Work experience with id ${id} not found`);
        }

        return plainToInstance(WorkExperienceResponceDto, experience, {
            excludeExtraneousValues: true,
        });
    }

    async create(createDto: CreateWorkExperienceDto): Promise<WorkExperienceResponceDto>{
        const workExperience = this.workExperienceRepository.create(createDto);
        const savedExperience = await this.workExperienceRepository.save(workExperience);

        const fullExperience = await this.workExperienceRepository.findOne({
            where: { id: savedExperience.id },
            relations: ['employee']
        });

        return plainToInstance(WorkExperienceResponceDto, fullExperience, {
            excludeExtraneousValues: true,
        })
    }

    async update(id: number, updateDto: UpdateWorkExperienceDto): Promise<WorkExperienceResponceDto>{
        const experience = await this.workExperienceRepository.findOne({
            where: { id }
        });

        if(!experience){
            throw new NotFoundException(`Work experience wioth ID ${id} not found`);
        }

        await this.workExperienceRepository.update(id, updateDto);
        const updatedExperience = await this.workExperienceRepository.findOne({
            where: { id },
            relations: ['employee'],
        })

        return plainToInstance(WorkExperienceResponceDto, updatedExperience, {
            excludeExtraneousValues: true,
        })
    }

    async remove(id: number): Promise<void>{
        const experience = await this.workExperienceRepository.findOne({
            where: { id }
        });

        if(!experience){
            throw new NotFoundException(`Work experience with ID ${id} not found`);
        }

        await this.workExperienceRepository.delete(id);
    }

    async findByEmployee(employeeId: number) : Promise<WorkExperienceResponceDto[]>{
        const experience = await this.workExperienceRepository.find({
            where: { employeeId },
            relations: ['employee'],
            order: { startDate: 'DESC' }
        });

        return plainToInstance(WorkExperienceResponceDto, experience, {
            excludeExtraneousValues: true, 
        })
    }

    async getTotalExperienceYers(employeeId: number): Promise<number>{
        const experiences = await this.workExperienceRepository.find({
            where: { employeeId }
        });

        let totalDays = 0;

        for(const exp of experiences){
            const startDate = new Date(exp.startDate);
            const endDate = exp.endDate ? new Date(exp.endDate) : new Date();
            const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 *24));
            totalDays += diffDays;
        }

        return parseFloat((totalDays / 365).toFixed(1));
    }
}
