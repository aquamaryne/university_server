import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Positions } from 'src/entity/positions';
@Injectable()
export class PositionsService {
    constructor(@InjectRepository(Positions) private readonly positionRepository: Repository<Positions>){}

    async create(positions: Positions): Promise<Positions>{
        return this.positionRepository.save(positions);
    }

    async findAll(): Promise<Positions[]>{
        return this.positionRepository.find();
    }

    async findOne(id: number): Promise<Positions>{
        return this.positionRepository.findOne({ where: {id} });
    }

    async update(id: number, positions: Positions): Promise<Positions>{
        await this.positionRepository.update(id, positions);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        await this.positionRepository.delete(id);
    }
}
