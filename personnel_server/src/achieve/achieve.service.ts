import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Achieve } from 'src/entity/achieve';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class AchieveService implements OnModuleInit {
    constructor(@InjectRepository(Achieve) 
        private achieveRepository: Repository<Achieve>,
        private dataSource: DataSource,
    ) {}

    async create(achieveData: Partial<Achieve>): Promise<Achieve>{
        return this.achieveRepository.save(achieveData);
    }

    async findAll(): Promise<Achieve[]>{
        return this.achieveRepository.find();
    }

    async findOne(id: number): Promise<Achieve>{
        return this.achieveRepository.findOne({ where: {id} });
    }

    async update(id: number, achieveData: Partial<Achieve>): Promise<Achieve>{
        await this.achieveRepository.update(id, achieveData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        await this.achieveRepository.delete(id);
    }

    async executeAchieveSqlFile(): Promise<void>{
        const filePath = path.join('sql/achieve.sql');
        const sql = fs.readFileSync(filePath, 'utf-8');

        await this.achieveRepository.query(sql);
    }

    async onModuleInit() {
        await this.executeAchieveSqlFile();
    }
}
