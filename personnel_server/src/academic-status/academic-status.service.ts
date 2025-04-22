import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicStatus } from '../entity/academic-status';
import { CreateAcamicStatusDto } from 'src/dto/academic-status/create';
import { UpdateAcamicStatusDto } from 'src/dto/academic-status/update';
import { ResponseAcademicStatusDto } from 'src/dto/academic-status/responce';
import { AcademicStatsDto, AcademicExperienceStatsDto } from 'src/dto/academic-status/stats';
import { plainToInstance  } from 'class-transformer';
@Injectable()
export class AcademicStatusService {
    constructor(
        @InjectRepository(AcademicStatus)
        private readonly academicStatusRepo: Repository<AcademicStatus>,
    ) {}

    async findAll(): Promise<AcademicStatus[]>{
        return this.academicStatusRepo.find({ 
            relations: ['employee'] 
        });
    }

    async findOne(id: number): Promise<AcademicStatus>{
        const academicStatus = await this.academicStatusRepo.findOne({
            where: { id },
            relations: ['employee'],
        });

        if(!academicStatus){
            throw new NotFoundException(`AcademicStatus with ID ${id} not found`);
        }

        return academicStatus;
    }

    async findByEmployeeId(employeeId: number): Promise<AcademicStatus> {
        const academicStatus = await this.academicStatusRepo.findOne({
            where: { employeeId },
            relations: ['employee'],
        });

        if(!academicStatus){
            throw new NotFoundException(`AcademicStatus with Employee ID ${employeeId} not found`);
        }

        return academicStatus;
    }

    async create(createAcademicStatusDto: CreateAcamicStatusDto): Promise<AcademicStatus> {
        const newAcademicStatus = this.academicStatusRepo.create(createAcademicStatusDto);
        const savedStatus = await this.academicStatusRepo.save(newAcademicStatus);

        return this.findOne(savedStatus.id);
    }

    async update(
        id: number,
        updateAcademicStatusData: UpdateAcamicStatusDto,
    ): Promise<AcademicStatus> {
        const academicStatus = await this.findOne(id);
        Object.assign(academicStatus, updateAcademicStatusData);
        return this.academicStatusRepo.save(academicStatus);
    }

    async remove(id: number): Promise<void>{
        const academicStatus = await this.findOne(id);
        await this.academicStatusRepo.remove(academicStatus);
    }

    async getAcademicStats(): Promise<AcademicStatsDto>{
        const [academics, doctors, candidates] = await Promise.all([
            this.academicStatusRepo.count({ where: { isAcademic: true }}),
            this.academicStatusRepo.count({ where: { isDoctor: true }}),
            this.academicStatusRepo.count({ where: { isCandidate: true }}),
        ]);

        return plainToInstance(AcademicStatsDto, {
            totalAcademics: academics,
            totalDoctors: doctors,
            totalCandidates: candidates,
        }, { excludeExtraneousValues: true });
    }

    async getAverageExperience(): Promise<AcademicExperienceStatsDto>{
        const result = await this.academicStatusRepo
            .createQueryBuilder('academicStatus')
            .select(
                'AVG(academicStatus.totalAcademicExperience)', 
                'averageAcademicExperience'
            )
            .addSelect(
                'AVG(academicStatus.instituteAcademicExperience)', 'averageInstituteExperience',
            )
            .where('academic_status.isAcademic = :isAcademic', { isAcademic: true })
            .getRawOne();

        return plainToInstance(AcademicExperienceStatsDto, {
            averageAcademicExperience: parseFloat(result.averageAcademicExperience) || 0,
            averageInstituteExperience: parseFloat(result.averageInstituteExperience) || 0,
        }, { excludeExtraneousValues: true });
    }

    toResponceDto(academicStatus: AcademicStatus): ResponseAcademicStatusDto {
        return plainToInstance(ResponseAcademicStatusDto, academicStatus, {
            excludeExtraneousValues: true,
        })
    }
}
