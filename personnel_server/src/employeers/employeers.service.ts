import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'src/entity/employees';
import { CreateEmployeeDto } from 'src/dto/employee/create';
import { UpdateEmployeeDto } from 'src/dto/employee/update';
import { EmployeeResponceDto } from 'src/dto/employee/responce';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class EmployeersService {
    constructor(@InjectRepository(Employee) private employeersRepository: Repository<Employee>){}
    
    async create(CreateEmployeeDto: CreateEmployeeDto): Promise<Employee>{
        const employee = this.employeersRepository.create(CreateEmployeeDto);
        return this.employeersRepository.save(employee);
    }

    async findAll(): Promise<Employee[]>{
        return this.employeersRepository.find({
            relations: ['employeeType'],
        });
    }

    async findOne(id: number): Promise<Employee>{
        const employee = await this.employeersRepository.findOne({
            where: { id },
            relations: ['employeeType'],
        });

        if(!employee){
            throw new NotFoundException(`Employee with id ${id} not found`); 
        }
        return employee;
    }

    async update(id: number, UpdateEmployeeDto: UpdateEmployeeDto): Promise<Employee>{
        const employee = await this.findOne(id);
        if(!employee){
            throw new NotFoundException(`Employee with id ${id} not found`); 
        }
        Object.assign(employee, UpdateEmployeeDto);
        await this.employeersRepository.save(employee);
        return this.findOne(id);
    }

    async softRemove(id: number): Promise<void>{
        const employee = await this.employeersRepository.softDelete(id);
        if(!employee){
            throw new NotFoundException(`Employee with id ${id} not found`); 
        }

        await this.employeersRepository.softDelete(id);
    }

    async restore(id: number): Promise<void>{
        const result = await this.employeersRepository.restore(id);
        if(result.affected === 0){
            throw new NotFoundException(`Employee with id ${id} not found or alredy restored`); 
        }
    } 

    async findByLetter(letter: string): Promise<Employee[]>{
        return this.employeersRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.employeeType', 'employeeType')
            .where('employee.secondName LIKE :letter', { letter: `${letter}%` })
            .getMany();
    }

    async findByQuery(query: string): Promise<Employee[]>{
        return this.employeersRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.employeeType', 'employeeType')
            .where('employee.secondName LIKE :query OR employee.firstName LIKE :query', 
                  { query: `%${query}%` })
            .getMany();
    }

    async getAllEmployeers(): Promise<Employee[]>{
        return this.employeersRepository.find({
            relations: ['employeeType'],
        });
    }

    async findByUniqueCard(uniqueCard: string): Promise<Employee>{
        const employee = await this.employeersRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.employeeType', 'employeeType')
            .where('employee.uniqueCard = :uniqueCard', { uniqueCard })
            .getOne();
        if(!employee){
            throw new NotFoundException(`Employee with uniqueCard ${uniqueCard} not found`); 
        }
        return employee;
    }

    toResponceDto(employee: Employee): EmployeeResponceDto{
        return plainToInstance(EmployeeResponceDto, employee, {
            excludeExtraneousValues: true,
        })
    }
}
