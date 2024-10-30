import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employeers } from 'src/entity/employeers';

@Injectable()
export class EmployeersService {
    constructor(@InjectRepository(Employeers) private employeersRepository: Repository<Employeers>){}
    
    async create(employeer: Employeers): Promise<Employeers>{
        return this.employeersRepository.save(employeer);
    }

    async findAll(): Promise<Employeers[]>{
        return this.employeersRepository.find();
    }

    async findOne(id: number): Promise<Employeers>{
        return this.employeersRepository.findOne({ where: { id } });
    }

    async update(id: number, employeer: Employeers): Promise<Employeers>{
        await this.employeersRepository.update(id, employeer);
        return this.findOne(id);
    }

    async softRemove(id: number): Promise<void>{
        await this.employeersRepository.softDelete(id);
    }

    async restore(id: number): Promise<void>{
        await this.employeersRepository.restore(id);
    }

    
    async findByLetter(letter: string): Promise<Employeers[]>{
        console.log(`Finding by letter: ${letter}`);
        const result = await this.employeersRepository
            .createQueryBuilder('employeer')
            .where('employeer.sname LIKE :letter', { letter: `${letter}%` })
            .getMany();
        console.log(`Result for letter ${letter}`, result);
        return result;
    }
    
    async findByQuery(query: string): Promise<Employeers[]>{
        console.log(`Finding by query: ${query}`);
        const result = await this.employeersRepository
            .createQueryBuilder('employeer')
            .where('employeer.sname LIKE :query', { query: `%${query}%` })
            .getMany();
        console.log(`Results for query: ${query}`, result);
        return result;
    }

    async getAllEmployeers(): Promise<Employeers[]>{
        console.log(`Fetching all employeers`);
        const result = await this.employeersRepository.find();
        console.log(`Total employeers fetched: ${result.length}`);
        return result;
    }
}
