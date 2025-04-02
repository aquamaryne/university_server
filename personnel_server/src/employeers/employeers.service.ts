import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'src/entity/employees';

@Injectable()
export class EmployeersService {
    constructor(@InjectRepository(Employee) private employeersRepository: Repository<Employee>){}
    
    async create(employeer: Employee): Promise<Employee>{
        return this.employeersRepository.save(employeer);
    }

    async findAll(): Promise<Employee[]>{
        return this.employeersRepository.find();
    }

    async findOne(id: number): Promise<Employee>{
        return this.employeersRepository.findOne({ where: { id } });
    }

    async update(id: number, employeer: Employee): Promise<Employee>{
        await this.employeersRepository.update(id, employeer);
        return this.findOne(id);
    }

    async softRemove(id: number): Promise<void>{
        await this.employeersRepository.softDelete(id);
    }

    async restore(id: number): Promise<void>{
        await this.employeersRepository.restore(id);
    }

    async findByLetter(letter: string): Promise<Employee[]>{
        const result = await this.employeersRepository
            .createQueryBuilder('employeer')
            .where('employeer.sname LIKE :letter', { letter: `${letter}%` })
            .getMany();
        return result;
    }
    
    async findByQuery(query: string): Promise<Employee[]>{
        const result = await this.employeersRepository
            .createQueryBuilder('employeer')
            .where('employeer.sname LIKE :query', { query: `%${query}%` })
            .getMany();
        return result;
    }

    async getAllEmployeers(): Promise<Employee[]>{
        const result = await this.employeersRepository.find();
        return result;
    }

    async findByUniqueCard(uniqueCard: string): Promise<Employee>{
        const result = await this.employeersRepository
            .createQueryBuilder('employeer')
            .where('employeer.unique_card = :uniqueCard', { uniqueCard })
            .getOne();
        return result;
    }
}
