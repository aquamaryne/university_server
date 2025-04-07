import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { UniversityEmployment } from '../entity/university-employment';
import e from 'express';

@Injectable()
export class UnviversityEmploymentService {
    constructor(
        @InjectRepository(UniversityEmployment)
        private universityEmployment: Repository<UniversityEmployment>
    ) {}

    async fundAll(): Promise<UniversityEmployment[]>{
        return this.universityEmployment.find({
            relations: ['employee', 'department', 'pasition', 'workmode'],
        });
    }

    async findOne(id: number): Promise<UniversityEmployment>{
        const employment = await this.universityEmployment.findOne({
            where: { id }, 
            relations: ['employee', 'department', 'position', 'workmode'],
        });

        if(!employment){
            throw new NotFoundException(`University Employment with ID ${id} not found`);
        }

        return employment;
    }

    async findByEmployee(employeeId: number): Promise<UniversityEmployment>{
        const employment = await this.universityEmployment.findOne({
            where: { employeeId },
            relations: ['employee', 'department', 'position', 'workmode'],
        });

        if(!employment){
            throw new NotFoundException(`University Employment with Employee ID ${employeeId} not found`);
        }

        return employment;
    }

    async findByDepartment(departmentId: number): Promise<UniversityEmployment[]>{
        return this.universityEmployment.find({
            where: { departmentId },
            relations: ['employee', 'department', 'position', 'workMode'],
        });
    }

    async findByWorkMode(workModeId: number): Promise<UniversityEmployment[]>{
        return this.universityEmployment.find({
            where: { workModeId },
            relations: ['employee', 'department', 'position'],
        });
    }

    async findContractEndDateRange(startDate: Date, endDate: Date): Promise<UniversityEmployment[]>{
        return this.universityEmployment.find({
            where: {
                employmentContractEndDate: Between(startDate, endDate),
            },
            relations: ['employee', 'department', 'position', 'workMode'],
        });
    }

    async findWithExpiringContracts(daysThreshold: number = 30): Promise<UniversityEmployment[]>{
        const today = new Date();
        const thresholdDate = new Date();
        thresholdDate.setDate(today.getDate() + daysThreshold);

        return this.universityEmployment.find({
            where: {
                employmentContractEndDate: Between(today, thresholdDate),
            },
            relations: ['employee', 'department', 'position', 'workMode'],
        })
    }

    async create(employmentData: Partial<UniversityEmployment>): Promise<UniversityEmployment>{
        const employment = this.universityEmployment.create(employmentData);
        return this.universityEmployment.save(employment);
    }

    async update(
        id: number,
        employmentData: Partial<UniversityEmployment>,
    ): Promise<UniversityEmployment>{
        const employment = await this.findOne(id);
        Object.assign(employment, employmentData);
        return this.universityEmployment.save(employment);
    }

    async remove(id: number): Promise<void>{
        const employment = await this.findOne(id);
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

    async getEmployeesByExpirience(minYears: number, maxYears?: number): Promise<UniversityEmployment[]>{
        const whereClause: any = {
            totalEperienceYears: MoreThanOrEqual(minYears),
        };

        if(maxYears){
            whereClause.totalExperienceYears = Between(minYears, maxYears);
        }

        return this.universityEmployment.find({
            where: whereClause,
            relations: ['employee', 'department', 'position'],
        });
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
