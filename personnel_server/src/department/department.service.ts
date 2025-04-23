import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entity/department';
import { Repository } from 'typeorm';
import { DepartmentCreateDto } from 'src/dto/department/create';
import { DepartmentUpdateDto } from 'src/dto/department/update';
import { ResponceDepartmentDto } from 'src/dto/department/responce';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class DepartmentService  {
    constructor(@InjectRepository(Department) private readonly departmentRepository: Repository<Department>) {}

    async findAll(): Promise<Department[]>{
        return this.departmentRepository.find({
            relations: [
                'faculty',
                'universityEmployement',
                'staff'
            ]
        })
    }

    async findOne(id: number): Promise<Department>{
        const department = await this.departmentRepository.findOne({
            where: { id },
            relations:['faculty', 'universityEmployement', 'staff']
        })

        if(!department){
            throw new NotImplementedException(`Department with id ${id} not found`)
        }
        return department;
    }

    async create(createDepartmentDto: DepartmentCreateDto): Promise<Department>{
        const department = await this.departmentRepository.create(createDepartmentDto);
        const savedDepartment = await this.departmentRepository.save(department);
        return this.findOne(savedDepartment.id);
    }

    async update(id: number, updateDepartmentDto: DepartmentUpdateDto): Promise<Department>{
        const department = await this.findOne(id);
        Object.assign(department, updateDepartmentDto);
        await this.departmentRepository.save(department);
        return this.findOne(department.id);
    }

    async remove(id: number): Promise<void>{
        await this.departmentRepository.delete(id);
    }

    toResponceDto(department: Department): ResponceDepartmentDto{
        return plainToInstance(ResponceDepartmentDto, department, {
            excludeExtraneousValues: true,
        })
    }
}
