import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employeers } from 'src/entity/employeers';

@Injectable()
export class EmployeersService {
    constructor(@InjectRepository(Employeers) private readonly employersRepository: Repository<Employeers>){}
    
    async create(employeer: Employeers): Promise<Employeers>{
        return this.employersRepository.save(employeer);
    }

    async findAll(): Promise<Employeers[]>{
        return this.employersRepository.find();
    }

    async findOne(id: number): Promise<Employeers>{
        return this.employersRepository.findOne({ where: {id} });
    }

    async update(id: number, employeer: Employeers): Promise<Employeers>{
        await this.employersRepository.update(id, employeer);
        return this.findOne(id);
    }

    async softRemove(id: number): Promise<void>{
        await this.employersRepository.delete(id);
    }

    async restore(id: number): Promise<void>{
        await this.employersRepository.restore(id);
    }

    async getAllEmployeers(includedDeleted = false): Promise<Employeers[]>{
        if(includedDeleted){
            return this.employersRepository.find({ withDeleted: true })
        } else {
            return this.employersRepository.find();
        }
    }
}
