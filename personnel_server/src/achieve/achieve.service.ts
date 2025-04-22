import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achieve } from 'src/entity/achieve';
import { CreateAchieveDto } from 'src/dto/achieve/create';
import { UpdateAchieveDto } from 'src/dto/achieve/update';
import { ResponceAchieveDto } from 'src/dto/achieve/responce';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class AchieveService {
    constructor(@InjectRepository(Achieve) 
        private achieveRepository: Repository<Achieve>,
    ) {}

    async create(createAchieveDto: CreateAchieveDto): Promise<Achieve>{
        const achieve = this.achieveRepository.create(createAchieveDto);
        return this.achieveRepository.save(achieve);
    }

    async findAll(): Promise<Achieve[]>{
        return this.achieveRepository.find({
            relations: ['employeeAchievement'],
        });
    }

    async findOne(id: number): Promise<Achieve>{
        const achieve = await this.achieveRepository.findOne({
            where: { id },
            relations: ['employeeAchievement'],
        })

        if(!achieve){
            throw new NotFoundException(`Achieve with ID ${id} not found`);
        }
        return achieve;
    }

    async update(id: number, updateAchieveDto: UpdateAchieveDto): Promise<Achieve>{
        const achieve = await this.findOne(id);
        Object.assign(achieve, updateAchieveDto);
        await this.achieveRepository.save(achieve);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        const achieve = await this.findOne(id);
        await this.achieveRepository.delete(achieve);
    }

    toResponceDto(achieve: Achieve): ResponceAchieveDto{
        return plainToInstance(ResponceAchieveDto, achieve, {
            excludeExtraneousValues: true,
        });
    }
}
