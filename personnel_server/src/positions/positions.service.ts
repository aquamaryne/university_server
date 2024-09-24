import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Positions } from 'src/entity/positions';
@Injectable()
export class PositionsService {
    constructor(@InjectRepository(Positions) private readonly positionRepository: Repository<Positions>){}

    
    async findAll(): Promise<Positions[]>{
        return this.positionRepository.find();
    }
    
    async findOne(id: number): Promise<Positions | undefined>{
        return this.positionRepository.findOne({ where: {id} });
    }
    
    async create(positions: Positions): Promise<Positions>{
        const newPosition  = this.positionRepository.create(positions);
        return this.positionRepository.save(newPosition);
    }

    async update(id: number, positions: Positions): Promise<Positions>{
        await this.positionRepository.update(id, positions);
        return this.positionRepository.findOne({ where: {id} });
    }

    async remove(id: number): Promise<void>{
        await this.positionRepository.delete(id);
    }
}
