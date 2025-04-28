import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Family } from 'src/entity/family';
import { CreateFamilyDto } from 'src/dto/family/create';
import { UpdateFamilyDto } from 'src/dto/family/update';
import { FamiltyResponceDto } from 'src/dto/family/responce';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class FamilyService {
    constructor(@InjectRepository(Family) private readonly familyRepository: Repository<Family>){}

    async create(createFamilyDto: CreateFamilyDto): Promise<Family>{
        const family = this.familyRepository.create(createFamilyDto);
        const savedFamily = await this.familyRepository.save(family);
        return this.findOne(savedFamily.id);
    }

    async findAll(): Promise<Family[]>{
        return this.familyRepository.find({
            relations: ['employee']
        })
    }

    async findOne(id: number): Promise<Family>{
        const family = await this.familyRepository.findOne({
            where: { id },
            relations: ['employee']
        })

        if(!family){
            throw new NotFoundException(`Family with ID ${id} not found`);
        }

        return family;
    }

    async update(id: number, updateFamilyDto: UpdateFamilyDto): Promise<Family>{
        const family = await this.findOne(id);
        Object.assign(family, updateFamilyDto);
        await this.familyRepository.save(family);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        const family = await this.findOne(id);
        await this.familyRepository.delete(family);
    }

    toRespondDto(family: Family): FamiltyResponceDto{
        return plainToInstance(FamiltyResponceDto, family, {
            excludeExtraneousValues: true,
        })
    }
}
