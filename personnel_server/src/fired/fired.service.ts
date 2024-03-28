import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fired } from 'src/entity/fired';
import { Repository } from 'typeorm';

@Injectable()
export class FiredService {
    constructor(@InjectRepository(Fired) private firedRepository: Repository<Fired>) {}

    async create(firedData: Partial<Fired>): Promise<Fired>{
        return this.firedRepository.save(firedData);
    }

    async findAll(): Promise<Fired[]>{
        return this.firedRepository.find();
    }

    async findOne(id: number): Promise<Fired>{
        return this.firedRepository.findOne({ where: {id} })
    }

    async update(id: number, firedData: Partial<Fired>): Promise<Fired>{
        await this.firedRepository.update(id, firedData);
        return this.findOne(id);
    }
    
    async remove(id: number): Promise<void>{
        await this.firedRepository.delete(id);
    }
}
