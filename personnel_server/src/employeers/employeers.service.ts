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
        const result = await this.employeersRepository
            .createQueryBuilder('employeer')
            .where('employeer.sname LIKE :letter', { letter: `${letter}%` })
            .getMany();
        return result;
    }
    
    async findByQuery(query: string): Promise<Employeers[]>{
        const result = await this.employeersRepository
            .createQueryBuilder('employeer')
            .where('employeer.sname LIKE :query', { query: `%${query}%` })
            .getMany();
        return result;
    }

    async getAllEmployeers(): Promise<Employeers[]>{
        const result = await this.employeersRepository.find();
        return result;
    }

    async findByUniqueCard(uniqueCard: string): Promise<Employeers>{
        const result = await this.employeersRepository
            .createQueryBuilder('employeer')
            .where('employeer.unique_card = :uniqueCard', { uniqueCard })
            .getOne();
        return result;
    }
}
