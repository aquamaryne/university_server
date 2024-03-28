import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achieve } from 'src/entity/achieve';

@Injectable()
export class AchieveService {
    constructor(@InjectRepository(Achieve) private achieveRepository: Repository<Achieve>) {}

    async create(achieveData: Partial<Achieve>): Promise<Achieve>{
        return this.achieveRepository.save(achieveData);
    }

    async findAll(): Promise<Achieve[]>{
        return this.achieveRepository.find();
    }

    async findOne(id: number): Promise<Achieve>{
        return this.achieveRepository.findOne({ where: {id} });
    }

    async update(id: number, achieveData: Partial<Achieve>): Promise<Achieve>{
        await this.achieveRepository.update(id, achieveData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        await this.achieveRepository.delete(id);
    }
}
