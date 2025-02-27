import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from 'src/entity/staff';
@Injectable()
export class StaffService {
    constructor(@InjectRepository(Staff) private readonly staffRepository: Repository<Staff>){}

    
    async findAll(): Promise<Staff[]>{
        return this.staffRepository.find();
    }
    
    async findOne(id: number): Promise<Staff | undefined>{
        return this.staffRepository.findOne({ where: {id} });
    }
    
    async create(positions: Staff): Promise<Staff>{
        const newPosition  = this.staffRepository.create(positions);
        return this.staffRepository.save(newPosition);
    }

    async update(id: number, positions: Staff): Promise<Staff>{
        await this.staffRepository.update(id, positions);
        return this.staffRepository.findOne({ where: {id} });
    }

    async remove(id: number): Promise<void>{
        await this.staffRepository.delete(id);
    }
}
