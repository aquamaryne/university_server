import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from 'src/entity/education';
import { CreateEducationDto } from 'src/dto/education/create';
import { UpdateEducationDto } from 'src/dto/education/update';
import { EducationResponceDto } from 'src/dto/education/responce';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class EducationService {
    constructor(
        @InjectRepository(Education)
        private readonly educationRepository: Repository<Education>,
    ) {}

    async create(createEducationDto: CreateEducationDto): Promise<Education>{
        const education =  this.educationRepository.create(createEducationDto)
        const savedEducation = await this.educationRepository.save(education);
        return this.findOne(savedEducation.id);
    }

    async findAll(): Promise<Education[]>{
        return this.educationRepository.find({
            relations: ['employee']
        });
    }

    async findOne(id: number): Promise<Education>{
        const education = await this.educationRepository.findOne({
            where: { id },
            relations: ['employee']
        });

        if(!education){
            throw new NotFoundException(`Education with ID ${id} not found`)
        }
        return education;
    }

    async update(id: number, educationUpdateDto: UpdateEducationDto): Promise<Education>{
        const education = await this.findOne(id);
        Object.assign(education, educationUpdateDto);
        await this.educationRepository.save(education);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        const education = await this.findOne(id);
        await this.educationRepository.delete(education);
    }

    toRespondDto(education: Education): EducationResponceDto {
        return plainToInstance(EducationResponceDto, education, {
            excludeExtraneousValues: true,
        })
    }
}
