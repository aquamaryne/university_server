import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeType } from 'src/entity/employee-type';

@Injectable()
export class EmployeeTypeService {
    constructor(
        @InjectRepository(EmployeeType)
        private employeeTypeRepository: Repository<EmployeeType>
    ) {}

    async findAll(): Promise<EmployeeType[]>{
        return this.employeeTypeRepository.find();
    }

    async findOne(id: number): Promise<EmployeeType>{
        const employeeType = await this.employeeTypeRepository.findOne({
            where: { id },
            relations: ['employee'],
        });

        if(!employeeType){
            throw new NotFoundException(`Type of employee with ID ${id} not found`);
        }

        return employeeType;
    }

    async findByTypeName(typeName: string): Promise<EmployeeType>{
        const employeeType = await this.employeeTypeRepository.findOne({
            where: { typeName }
        })

        if(!employeeType){
            throw new NotFoundException(`Employee type "${typeName}" not found`);
        }

        return employeeType;
    }

    async create(emplyeeTypeData: Partial<EmployeeType>): Promise<EmployeeType>{
        const employeeType = this.employeeTypeRepository.create(emplyeeTypeData);
        return this.employeeTypeRepository.save(employeeType);
    }

    async update(id: number, employeeTypeData: Partial<EmployeeType>): Promise<EmployeeType>{
        await this.findOne(id);
        await this.employeeTypeRepository.update(id, employeeTypeData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        const employeeType = await this.findOne(id); 
        if(employeeType.employees && employeeType.employees.length > 0){
            throw new Error(`It is not possible to delete an employee type because it is associated with ${employeeType.employees.length} employees`);
        }
        await this.employeeTypeRepository.remove(employeeType);
    }

    async getEmployeeTypeStats(): Promise<any[]>{
        return this.employeeTypeRepository
            .createQueryBuilder('type')
            .leftJoin('type.employees', 'employee')
            .select('type.id', 'typeId')
            .addSelect('type.typeName', 'typeName')
            .addSelect('COUNT(employee.id)', 'employeeCount')
            .groupBy('type.id')
            .orderBy('employeeCount', 'DESC')
            .getRawMany();
    }
}
