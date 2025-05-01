import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalInfo } from 'src/entity/personal-info';
import { Repository } from 'typeorm';
import { CreatePersonalInfoDto } from 'src/dto/personal-info/create';
import { UpdatePersonalInfoDto } from 'src/dto/personal-info/update';
import { PersonalInfoResponceDto } from 'src/dto/personal-info/repsonce';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class PersonalInfoService {
    constructor(@InjectRepository(PersonalInfo) private personalInfoRepository: Repository<PersonalInfo>) {}

    async findAll(): Promise<PersonalInfo[]>{
        return this.personalInfoRepository.find({
            relations: ['employee', 'birthPlace', 'familyStatus']
        });
    }

    async findOne(id: number): Promise<PersonalInfo>{
        const personalInfo = this.personalInfoRepository.findOne({ 
            where: {id},
            relations: ['employee', 'birthPlace', 'familyStatus'] 
        });

        if(!personalInfo){
            throw new NotFoundException(`Personal info with ID ${id} not found`);
        }

        return personalInfo;
    }

    async create(createPersonalInfoDto: CreatePersonalInfoDto): Promise<PersonalInfo>{
        const personalInfo = this.personalInfoRepository.create(createPersonalInfoDto);
        const savedInfo = await this.personalInfoRepository.save(personalInfo);
        return this.findOne(savedInfo.id);
    }

    async update(id: number, updatePersonalInfoDto: UpdatePersonalInfoDto): Promise<PersonalInfo>{
        const personalInfo = await this.findOne(id);
        Object.assign(personalInfo, updatePersonalInfoDto);
        await this.personalInfoRepository.save(personalInfo);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        const personalInfo = await this.findOne(id);
        await this.personalInfoRepository.remove(personalInfo);
    }

    toResonseDto(personalInfo: PersonalInfo): PersonalInfoResponceDto{
        return plainToInstance(PersonalInfoResponceDto, personalInfo, {
            excludeExtraneousValues: true,
        })
    }
}
