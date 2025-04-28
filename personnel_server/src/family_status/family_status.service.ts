import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FamilyStatus } from 'src/entity/family-status';
import { Repository } from 'typeorm';
import { CreateFamilyStatusDto } from 'src/dto/family-status/create';
import { FamilyStatusResponceDto } from 'src/dto/family-status/responce';
import { UpdateFamilyStatusDto } from 'src/dto/family-status/update';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class FamilyStatusService {
    constructor(@InjectRepository(FamilyStatus) private familyStatusRepository: Repository<FamilyStatus>) {}

    async findAll(): Promise<FamilyStatus[]>{
        return this.familyStatusRepository.find({
            relations: ['familyStatus']
        });
    }

    async findOne(id: number): Promise<FamilyStatus>{
        const familyStatus = await this.familyStatusRepository.findOne({ 
            where: {id},
            relations: ['familyStatus'] 
        });

        if(!familyStatus){
            throw new NotFoundException(`Family status with ID ${id} not found`)
        }

        return familyStatus;
    } 

    async create(createFamilyStatusDto: CreateFamilyStatusDto): Promise<FamilyStatus>{
        const familyStatus = this.familyStatusRepository.create(createFamilyStatusDto);
        const savedStatus = await this.familyStatusRepository.save(familyStatus);
        return this.findOne(savedStatus.id);
    }

    async update(id: number, updateFamilyStatusDro: UpdateFamilyStatusDto): Promise<FamilyStatus>{
        const status = await this.findOne(id);
        Object.assign(status, updateFamilyStatusDro);
        await this.familyStatusRepository.save(status);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        const status = await this.findOne(id);
        if(status.familyStatus && status.familyStatus.length > 0){
            throw new Error(`Cannot delete family status with ID ${id} because it is used by ${status.familyStatus.length} personal info records`);
        }
        
        await this.familyStatusRepository.remove(status);
    }

    toRespondDto(status: FamilyStatus): FamilyStatusResponceDto{
        return plainToInstance(FamilyStatusResponceDto, status, {
            excludeExtraneousValues: true,
        })
    }
}