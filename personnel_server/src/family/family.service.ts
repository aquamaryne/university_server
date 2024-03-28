import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Family } from 'src/entity/family';

@Injectable()
export class FamilyService {
    constructor(@InjectRepository(Family) private readonly familtRepository: Repository<Family>){}

    async create(family: Family): Promise<Family>{
        return this.familtRepository.save(family);
    }

    async findAll(): Promise<Family[]>{
        return this.familtRepository.find();
    }

    async findOne(id: number): Promise<Family>{
        return this.familtRepository.findOne({ where: {id} });
    }

    async update(id: number, family: Family): Promise<Family>{
        await this.familtRepository.update(id, family);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        await this.familtRepository.delete(id);
    }
}
