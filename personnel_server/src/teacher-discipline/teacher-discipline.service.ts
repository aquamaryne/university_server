import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherDiscipline } from 'src/entity/teacher-discipline';
import { CreateTeacherDisciplineDto } from 'src/dto/teacher-discipline/create';
import { UpdateTeacherDisciplineDto } from 'src/dto/teacher-discipline/update';
import { ResponceTeacherDisciplineDto } from 'src/dto/teacher-discipline/responce';
import { DisciplineStatsDto, TopTeacherDto } from 'src/dto/teacher-discipline/stats';
import { plainToInstance } from 'class-transformer';
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

    async create(createTeacherDisciplineDto: CreateTeacherDisciplineDto): Promise<TeacherDiscipline>{
        const teacherDiscipline = this.teacherDisciplineRepository.create(createTeacherDisciplineDto);
        const saveDiscipline = await this.teacherDisciplineRepository.save(teacherDiscipline);

        return this.findOne(saveDiscipline.id);
    }

    async update(id: number, updateTeacherDiscipline: UpdateTeacherDisciplineDto): Promise<TeacherDiscipline>{
        await this.findOne(id);
        await this.teacherDisciplineRepository.update(id, updateTeacherDiscipline);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{    
        const teacherDiscipline = await this.findOne(id);
        await this.teacherDisciplineRepository.remove(teacherDiscipline);
    }

    async getDisciplineStats(): Promise<DisciplineStatsDto[]>{
        const stats = await this.teacherDisciplineRepository
            .createQueryBuilder('discipline')
            .select('discipline.disciplineName', 'disciplineName')
            .addSelect('COUNT(discipline.id)', 'teacherCount')
            .groupBy('discipline.disciplineName')
            .orderBy('teacherCount', 'DESC')
            .getRawMany();

        return plainToInstance(DisciplineStatsDto, stats, {
            excludeExtraneousValues: true
        })
    }

    async getTopTeacherrByDisciplineCound(limit: number = 10): Promise<TopTeacherDto[]>{
        const topTeachers = await this.teacherDisciplineRepository
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

        return plainToInstance(TopTeacherDto, topTeachers, {
            excludeExtraneousValues: true
        })
    }

    toRespoceDto(teacherDiscipline: TeacherDiscipline): ResponceTeacherDisciplineDto {
        return plainToInstance(ResponceTeacherDisciplineDto, teacherDiscipline, {
            excludeExtraneousValues: true,
        })
    }

    toResponceDtoArray(teacherDicipline: TeacherDiscipline[]): ResponceTeacherDisciplineDto[] {
        return plainToInstance(ResponceTeacherDisciplineDto, teacherDicipline, {
            excludeExtraneousValues: true,
        })
    }
}
