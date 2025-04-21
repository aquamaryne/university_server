import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeType } from 'src/entity/employee-type';
import { EmployeeTypeResponceDto } from 'src/dto/employee-type/responce';
import { EmployeeTypeStatsDto } from 'src/dto/employee-type/stats';
import { EmployeeTypeUpdateDto } from 'src/dto/employee-type/update';
import { EmployeeTypeCreateDto } from 'src/dto/employee-type/create';   
import { plainToInstance } from 'class-transformer';
@Injectable()
export class EmployeeTypeService {
    constructor(
        @InjectRepository(EmployeeType)
        private employeeTypeRepository: Repository<EmployeeType>
    ) {}

    async findAll(): Promise<EmployeeType[]>{
        return this.employeeTypeRepository.find({
            relations: ['employees']
        });
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

    async create(createEmployeeTypeDto: EmployeeTypeCreateDto): Promise<EmployeeType>{
        const employeeType = this.employeeTypeRepository.create({
            ...createEmployeeTypeDto,
            employees: createEmployeeTypeDto.employees?.map(id => ({ id })),
        });
        return this.employeeTypeRepository.save(employeeType);
    }

    async update(id: number, updateEmployeeTypeDto: EmployeeTypeUpdateDto): Promise<EmployeeType>{
        await this.findOne(id);
        const updateData = {
            ...updateEmployeeTypeDto,
            employees: updateEmployeeTypeDto.employees?.map(id => ({ id })),
        };
        await this.employeeTypeRepository.update(id, updateData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        const employeeType = await this.findOne(id); 
        if(employeeType.employees && employeeType.employees.length > 0){
            throw new Error(`It is not possible to delete an employee type because it is associated with ${employeeType.employees.length} employees`);
        }
        await this.employeeTypeRepository.remove(employeeType);
    }

    async getEmployeeTypeStats(): Promise<EmployeeTypeStatsDto[]>{
        const stats = await this.employeeTypeRepository
            .createQueryBuilder('type')
            .leftJoin('type.employees', 'employee')
            .select('type.id', 'typeId')
            .addSelect('type.typeName', 'typeName')
            .addSelect('COUNT(employee.id)', 'employeeCount')
            .groupBy('type.id')
            .orderBy('employeeCount', 'DESC')
            .getRawMany();

        return plainToInstance(EmployeeTypeStatsDto, stats, {
            excludeExtraneousValues: true
        });
    }

    toResponceDto(employeeType: EmployeeType): EmployeeTypeResponceDto{
        return plainToInstance(EmployeeTypeResponceDto, employeeType,{
            exposeDefaultValues: true,
        });
    }
}
