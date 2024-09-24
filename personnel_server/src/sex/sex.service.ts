import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sex } from 'src/entity/sex';
import { Repository } from 'typeorm';

@Injectable()
export class SexService {
    constructor(@InjectRepository(Sex) private sexRepository: Repository<Sex>) {}

    async findAll(): Promise<Sex[]>{
        return this.sexRepository.find();
    }

    async findOne(id: number): Promise<Sex | undefined>{
        return this.sexRepository.findOne({ where: {id} });
    }

    async create(data: Partial<Sex>): Promise<Sex>{
        const sex = this.sexRepository.create(data);
        return this.sexRepository.save(sex);
    } 

    async update(id: number, data: Partial<Sex>): Promise<Sex>{
        await this.sexRepository.update(id, data);
        return this.sexRepository.findOne({ where: {id} });
    }

    async remove(id: string): Promise<void>{
        await this.sexRepository.delete(id);
    }
}
