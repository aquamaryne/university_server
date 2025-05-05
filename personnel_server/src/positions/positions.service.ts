import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Positions } from 'src/entity/positions';
import { CreatePositionDto } from 'src/dto/position/create';
import { UpdatePositionDto } from 'src/dto/position/update';
import { PositionResponceDto } from 'src/dto/position/responce';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class PositionsService {
    constructor(@InjectRepository(Positions) private readonly positionRepository: Repository<Positions>){}

    
    async findAll(): Promise<Positions[]>{
        return this.positionRepository.find({
            relations: ['universityEmployement']
        });
    }
    
    async findOne(id: number): Promise<Positions>{
        const positions = this.positionRepository.findOne({ 
            where: { id },
            relations: ['universityEmployement'] 
        });
        
        if(!positions){
            throw new NotFoundException(`Position with ID ${id} not found`);
        }
        
        return positions;
    }
    
    async create(createPositionsDto: CreatePositionDto): Promise<Positions>{
        const positions = this.positionRepository.create(createPositionsDto);
        const savedPositions = await this.positionRepository.save(positions);
        return this.findOne(savedPositions.id);
    }

    async update(id: number, updatePositionsDto: UpdatePositionDto): Promise<Positions>{
        const position = await this.findOne(id);
        Object.assign(position, updatePositionsDto);
        await this.positionRepository.save(position);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        const position = await this.findOne(id);
        if(position.universityEmployement && position.universityEmployement.length > 0){
            throw new Error(`Cannot delete position with ID ${id} because it is associated with ${position.universityEmployement.length} employments`)
        }

        await this.positionRepository.remove(position);
    }

    toResposeDto(position: Positions): PositionResponceDto {
        return plainToInstance(PositionResponceDto, position, {
            excludeExtraneousValues: true,
        })
    }
}
