import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { UniversityEmployment } from '../entity/university-employment';
import { CreateUniversityEmployeeDto } from 'src/dto/university-employement/create';
import { UpdateUniversityEmployeeDto } from 'src/dto/university-employement/update';
import { UniversityEmployementResponseDto } from 'src/dto/university-employement/responce';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class UnviversityEmploymentService {
    constructor(
        @InjectRepository(UniversityEmployment)
        private universityEmployment: Repository<UniversityEmployment>
    ) {}

    async findAll(): Promise<UniversityEmployementResponseDto[]>{
        const employements = await this.universityEmployment.find({
            relations: ['employee', 'department', 'pasition', 'workmode'],
        });

        return plainToInstance(UniversityEmployementResponseDto, employements as object[], {
            excludeExtraneousValues: true,
        })
    }

    async findOne(id: number): Promise<UniversityEmployementResponseDto>{
        const employment = await this.universityEmployment.findOne({
            where: { id }, 
            relations: ['employee', 'department', 'position', 'workmode'],
        });

        if(!employment){
            throw new NotFoundException(`University Employment with ID ${id} not found`);
        }

        return plainToInstance(UniversityEmployementResponseDto, employment, {
            excludeExtraneousValues: true
        });
    }

    async findByEmployee(employeeId: number): Promise<UniversityEmployementResponseDto>{
        const employment = await this.universityEmployment.findOne({
            where: { employeeId },
            relations: ['employee', 'department', 'position', 'workmode'],
        });

        if(!employment){
            throw new NotFoundException(`University Employment with Employee ID ${employeeId} not found`);
        }

        return plainToInstance(UniversityEmployementResponseDto, employment, {
            excludeExtraneousValues: true
        });
    }

    async findByDepartment(departmentId: number): Promise<UniversityEmployementResponseDto[]>{
        const employements = await this.universityEmployment.find({
            where: { departmentId },
            relations: ['employee', 'department', 'position', 'workMode'],
        });

        return plainToInstance(UniversityEmployementResponseDto, employements, {
            excludeExtraneousValues: true,
        });
    }

    async findByWorkMode(workModeId: number): Promise<UniversityEmployementResponseDto[]>{
        const employements = await this.universityEmployment.find({
            where: { workModeId },
            relations: ['employee', 'department', 'position'],
        });

        return plainToInstance(UniversityEmployementResponseDto, employements, {
            excludeExtraneousValues: true
        })
    }

    async findContractEndDateRange(startDate: Date, endDate: Date): Promise<UniversityEmployementResponseDto[]>{
        const employement = await this.universityEmployment.find({
            where: {
                employementContractEndDate: Between(startDate, endDate),
            },
            relations: ['employee', 'department', 'position', 'workMode'],
        });

        return plainToInstance(UniversityEmployementResponseDto, employement, {
            excludeExtraneousValues: true,
        })
    }

    async findWithExpiringContracts(daysThreshold: number = 30): Promise<UniversityEmployementResponseDto[]>{
        const today = new Date();
        const thresholdDate = new Date();
        thresholdDate.setDate(today.getDate() + daysThreshold);

        const employements = await this.universityEmployment.find({
            where: {
                employementContractEndDate: Between(today, thresholdDate),
            },
            relations: ['employee', 'department', 'position', 'workMode'],
        });

        return plainToInstance(UniversityEmployementResponseDto, employements, {
            excludeExtraneousValues: true
        })
    }

    async create(createDto: CreateUniversityEmployeeDto): Promise<UniversityEmployementResponseDto>{
        const employment = this.universityEmployment.create(createDto);
        const savedEmployement = await this.universityEmployment.save(employment);
        const fullEmployement = await this.universityEmployment.findOne({
            where: { id: savedEmployement.id },
            relations: ['employee', 'department', 'position', 'workMode'],
        });

        return plainToInstance(UniversityEmployementResponseDto, fullEmployement, {
            excludeExtraneousValues: true
        })
    }

    async update(
        id: number,
        updateDto: UpdateUniversityEmployeeDto,
    ): Promise<UniversityEmployementResponseDto>{
        await this.universityEmployment.update(id, updateDto);
        const updatedEmployement = await this.universityEmployment.findOne({
            where: { id },
            relations: ['employee', 'department', 'position', 'workMode'],
        });

        if(!updatedEmployement){
            throw new NotFoundException(`Universityt employement with ID ${id} not found`);
        }

        return plainToInstance(UniversityEmployementResponseDto, updatedEmployement, {
            excludeExtraneousValues: true
        })
    }

    async remove(id: number): Promise<void>{
        const employment = await this.universityEmployment.findOne({
            where: { id }
        });

        if(!employment){
            throw new NotFoundException(`University employement with ID ${id} not found`);
        }

        await this.universityEmployment.remove(employment);
        
    }

    async getStatsByDepartment(): Promise<any[]>{
        return this.universityEmployment
            .createQueryBuilder('employment')
            .leftJoin('employment.department', 'department')
            .select('department.id', 'departmentId')
            .addSelect('department.name', 'departmentName')
            .addSelect('COUNT(employment.id)', 'employeeCount')
            .addSelect('AVG(employment.totalExperienceYears)', 'avgExperience')
            .groupBy('department.id')
            .getRawMany();
    }

    async getStatsByPosition(): Promise<any[]>{
        return this.universityEmployment
            .createQueryBuilder('employment')
            .leftJoin('employment.position', 'position')
            .select('position.id', 'positionId')
            .addSelect('position.name', 'positionName')
            .addSelect('COUNT(employment.id)', 'employeeCount')
            .addSelect('AVG(employment.totalExperienceYears)', 'avgExperience')
            .groupBy('position.id')
            .getRawMany();
    }

    async getStatsByWorkMode(): Promise<any[]>{
        return this.universityEmployment
            .createQueryBuilder('employment')
            .leftJoin('employment.workMode', 'workMode')
            .select('workMode.id', 'workModeId')
            .addSelect('COUNT(employment.id)', 'employeeCount')
            .groupBy('workMode.id')
            .getRawMany();
    }

    async getEmployeesByExpirience(minYears: number, maxYears?: number): Promise<UniversityEmployementResponseDto[]>{
        const whereClause: any = {
            totalEperienceYears: MoreThanOrEqual(minYears),
        };

        if(maxYears){
            whereClause.totalExperienceYears = Between(minYears, maxYears);
        }

        const employees = await this.universityEmployment.find({
            where: whereClause,
            relations: ['employee', 'department', 'position', 'workMode'],
        });
        
        return plainToInstance(UniversityEmployementResponseDto, employees, {
            excludeExtraneousValues: true
        })
    }


    async getAvgExperienceByDepartment(): Promise<any[]>{
        return this.universityEmployment
            .createQueryBuilder('employment')
            .leftJoin('employment.department', 'department')
            .select('department.name', 'departmentName')
            .addSelect('AVG(employment.totalExperienceYears)', 'avgTotalExperience')
            .addSelect('AVG(employment.continuousWorkYears)', 'avgContinuousExperience')
            .groupBy('department.id')
            .orderBy('avgTotalExperience', 'DESC')
            .getRawMany();
    }
}
