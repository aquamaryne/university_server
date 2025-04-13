import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkMode } from 'src/entity/work-mode';

@Injectable()
export class WorkModeService {
    constructor(@InjectRepository(WorkMode) private workModerepository: Repository<WorkMode>){}

    async findAll(): Promise<WorkMode[]>{
        return this.workModerepository.find();
    }

    async findOne(id: number): Promise<WorkMode>{
        const workMode = await this.workModerepository.findOne({
            where: { id },
            relations: ['universityEmployement'],
        })

        if(!workMode){
            throw new NotFoundException(`Work mode with ID ${id} not found `);
        }

        return workMode;
    }

    async findByName(name: string): Promise<WorkMode[]>{
        return this.workModerepository
            .createQueryBuilder('workMode')
            .where('workMode.name LIKE :name', { name: `%${name}%`})
            .getMany();
    }

    async create(workModeData: Partial<WorkMode>): Promise<WorkMode>{
        const workMode = this.workModerepository.create(workModeData);
        return this.workModerepository.save(workMode);
    }

    async update(id: number, workModeData: Partial<WorkMode>): Promise<WorkMode>{
        await this.findOne(id);
        await this.workModerepository.update(id, workModeData);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        const workMode = await this.findOne(id);
        if(workMode.univarsityEmployement && workMode.univarsityEmployement.length > 0){
            throw new Error(`Cannot delete work mode because it is used for ${workMode.univarsityEmployement.length} of employment`);
        }
    }

    async getWorkModeStats(): Promise<any[]>{
        return this.workModerepository
            .createQueryBuilder('workMode')
            .leftJoin('workMode.univarsityEmployement', 'employment')
            .select('workMode.id', 'id')
            .addSelect('workMode.name', 'name')
            .addSelect('COUNT(employment.id)', 'employmentCount')
            .groupBy('workMode.id')
            .orderBy('employmentCount', 'DESC')
            .getRawMany();
    }

    async getPopularWorkModes(limit: number = 5): Promise<any>{
        return this.workModerepository
            .createQueryBuilder('workMode')
            .leftJoin('workMode.univarsityEmployement', 'employment')
            .select('workMode.id', 'id')
            .addSelect('workMode.name', 'name')
            .addSelect('COUNT(employment.id)', 'employeeCount')
            .groupBy('workMode.id')
            .orderBy('employeeCount', 'DESC')
            .limit(limit)
            .getRawMany();
    }
}
