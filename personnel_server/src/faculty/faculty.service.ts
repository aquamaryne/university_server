import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Faculty } from 'src/entity/faculty';
import { Repository } from 'typeorm';
import { CreateFacultyDto } from 'src/dto/faculty/create';
import { FacultyResponceDto } from 'src/dto/faculty/responce';
import { UpdateFacultyDto } from 'src/dto/faculty/update';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class FacultyService {
    constructor(@InjectRepository(Faculty) private readonly facultytRepository: Repository<Faculty>) {}

    async findAll(): Promise<Faculty[]>{
        return this.facultytRepository.find({
            relations: ['departments']
        });
    }

    async findOne(id: number): Promise<Faculty>{
        const faculty =  this.facultytRepository.findOne({ 
            where: { id },
            relations: ['departments'] 
        })

        if(!faculty){
            throw new NotFoundException(`Faculty with ID ${id} not found`)
        }

        return faculty;
    }

    async create(createFacultyDto: CreateFacultyDto): Promise<Faculty>{
        const faculty = this.facultytRepository.create(createFacultyDto);
        const savedFaculty = await this.facultytRepository.save(faculty);
        return this.findOne(savedFaculty.id);
    }

    async update(id: number, updateFacultyDto: UpdateFacultyDto): Promise<Faculty>{
        const faculty = await this.findOne(id);
        Object.assign(faculty, updateFacultyDto);
        await this.facultytRepository.save(faculty)
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        const faculty = await this.findOne(id);
        if(faculty.departments && faculty.departments.length > 0){
            throw new Error(`Cennot delete faculty with ID ${id} because it has asociated departments`);
        }
        await this.facultytRepository.remove(faculty);
    }

    toResponceDto(faculty: Faculty): FacultyResponceDto{
        return plainToInstance(FacultyResponceDto, faculty, {
            excludeExtraneousValues: true,
        })
    }
}
