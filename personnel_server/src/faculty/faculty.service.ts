import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Faculty } from 'src/entity/faculty';
import { Repository } from 'typeorm';

@Injectable()
export class FacultyService {
    constructor(@InjectRepository(Faculty) private readonly facultytRepository: Repository<Faculty>) {}

    async findAll(): Promise<Faculty[]>{
        return this.facultytRepository.find();
    }

    async findOne(id: number): Promise<Faculty | undefined>{
        return this.facultytRepository.findOne({ where: { id } })
    }

    async create(data: Partial<Faculty>): Promise<Faculty>{
        const department = this.facultytRepository.create(data);
        return this.facultytRepository.save(department);
    }

    async update(id: number, data: Partial<Faculty>): Promise<Faculty>{
        await this.facultytRepository.update(id, data);
        return this.facultytRepository.findOne({ where: {id} });
    }

    async remove(id: number): Promise<void>{
        await this.facultytRepository.delete(id);
    }
}
