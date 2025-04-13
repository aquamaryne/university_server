import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherDiscipline } from 'src/entity/teacher-discipline';

@Injectable()
export class TeacherDisciplineService {
    constructor(@InjectRepository(TeacherDiscipline) private teacherDisciplineRepository: Repository<TeacherDiscipline>){}

    async findAll(): Promise<TeacherDiscipline[]>{
        return this.teacherDisciplineRepository.find({
            relations: ['employee']
        });
    }

    async findOne(id: number): Promise<TeacherDiscipline>{
        const teacherDiscipline = await this.teacherDisciplineRepository.findOne({
            where: { id },
            relations: ['employee'],
        })

        if(!teacherDiscipline){
            throw new NotFoundException(`Teacher discipline with ID ${id} not found`);
        }

        return teacherDiscipline;
    }

    async findByDisciplineName(disciplineName: string): Promise<TeacherDiscipline[]>{
        return this.teacherDisciplineRepository.find({
            where: { disciplineName },
            relations: ['employee']
        })
    }

    async findByEmployeeId(employeeId: number): Promise<TeacherDiscipline[]>{
        return this.teacherDisciplineRepository.find({
            where: { employeeId },
        })
    }

    async create(teacherDisciplineData: Partial<TeacherDiscipline>): Promise<TeacherDiscipline>{
        const teacherDiscipline = this.teacherDisciplineRepository.create(teacherDisciplineData);
        return this.teacherDisciplineRepository.save(teacherDiscipline);
    }

    async update(id: number, teacherDiscipline: Partial<TeacherDiscipline>): Promise<TeacherDiscipline>{
        await this.findOne(id);
        await this.teacherDisciplineRepository.update(id, teacherDiscipline);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{    
        const teacherDiscipline = await this.findOne(id);
        await this.teacherDisciplineRepository.remove(teacherDiscipline);
    }

    async getDisciplineStats(): Promise<any[]>{
        return this.teacherDisciplineRepository
            .createQueryBuilder('discipline')
            .select('discipline.disciplineName', 'disciplineName')
            .addSelect('COUNT(discipline.id)', 'teacherCount')
            .groupBy('discipline.disciplineName')
            .orderBy('teacherCount', 'DESC')
            .getRawMany();
    }

    async getTopTeacherrByDisciplineCound(limit: number = 10): Promise<any[]>{
        return this.teacherDisciplineRepository
            .createQueryBuilder('discipline')
            .leftJoin('discipline.employee', 'employee')
            .select('employee.id', 'employeeId')
            .addSelect('employee.firstName', 'firstName')
            .addSelect('employee.secondName', 'secondName')
            .addSelect('employee.fatherly', 'fatherly')
            .addSelect('COUNT(discipline.id)', 'disciplineCount')
            .groupBy('employee.id')
            .orderBy('disciplineCount', 'DESC')
            .limit(limit)
            .getRawMany();
    }
}
