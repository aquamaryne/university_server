import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Military_Appearance } from 'src/entity/militaryAppearance';
import { Repository } from 'typeorm';

@Injectable()
export class MilitaryAppearanceService {
    constructor(@InjectRepository(Military_Appearance) private readonly militaryAppearanceRepository: Repository<Military_Appearance>) {}

    async findAll(): Promise<Military_Appearance[]>{
        return this.militaryAppearanceRepository.find();
    }

    async findById(id: number): Promise<Military_Appearance>{
        return this.militaryAppearanceRepository.findOne({ where: {id} });
    }

    async create(data: Partial<Military_Appearance>): Promise<Military_Appearance>{
        return this.militaryAppearanceRepository.save(data);
    }

    async update(id: number, data: Partial<Military_Appearance>): Promise<Military_Appearance>{
        await this.militaryAppearanceRepository.update(id, data);
        return this.findById(id);
    }

    async delete(id: number): Promise<void>{
        await this.militaryAppearanceRepository.delete(id);
    }
}
