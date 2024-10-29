import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employeers } from 'src/entity/employeers';

@Injectable()
export class EmployeersService {
    constructor(@InjectRepository(Employeers) private employersRepository: Repository<Employeers>){}
    
    async create(employeer: Employeers): Promise<Employeers>{
        return this.employersRepository.save(employeer);
    }

    async findAll(): Promise<Employeers[]>{
        return this.employersRepository.find();
    }

    async findOne(id: number): Promise<Employeers>{
        return this.employersRepository.findOne({ where: { id } });
    }

    async update(id: number, employeer: Employeers): Promise<Employeers>{
        await this.employersRepository.update(id, employeer);
        return this.findOne(id);
    }

    async softRemove(id: number): Promise<void>{
        await this.employersRepository.softDelete(id);
    }

    async restore(id: number): Promise<void>{
        await this.employersRepository.restore(id);
    }

    async getAllEmployeers(includedDeleted = false): Promise<Employeers[]>{
        if(includedDeleted){
            return this.employersRepository.find()
        } else {
            return this.employersRepository.find();
        }
    }

    async findByLetter(letter: string): Promise<Employeers[]>{
        console.log(`Finding by letter: ${letter}`);
        const result = this.employersRepository
            .createQueryBuilder('employeer')
            .where('employeer.deleteAt IS NULL')
            .andWhere('SUBSTRING(employeer.sname, 1, 1) = :letter', { letter })
            .getMany();
        console.log(`Result for letter ${letter}`, result);
        return result;
    }

    async findByQuery(query: string): Promise<Employeers[]>{
        console.log(`Finding by query: ${query}`);
        const result = this.employersRepository
            .createQueryBuilder('employeer')
            .where('employeer.deleteAt IS NULL')
            .andWhere('LOCATE(:query, employeer.sname) > 0', { query })
            .getMany();
        console.log(`results for query: ${query}`, result);
        return result;
    }
}
