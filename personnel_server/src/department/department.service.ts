import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entity/department';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
    constructor(@InjectRepository(Department) private readonly departmentRepository: Repository<Department>) {}

    async findAll(): Promise<Department[]>{
        return this.departmentRepository.find();
    }

    async findOne(id: number): Promise<Department | undefined>{
        return this.departmentRepository.findOne({ where: {id} })
    }

    async create(data: Partial<Department>): Promise<Department>{
        const department = this.departmentRepository.create(data);
        return this.departmentRepository.save(department);
    }

    async update(id: number, data: Partial<Department>): Promise<Department>{
        await this.departmentRepository.update(id, data);
        return this.departmentRepository.findOne({ where: {id} });
    }

    async remove(id: number): Promise<void>{
        await this.departmentRepository.delete(id);
    }
}
