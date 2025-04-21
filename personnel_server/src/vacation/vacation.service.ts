import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Vacation } from 'src/entity/vacation';
import { CreateVacationDto } from 'src/dto/vacation/create';
import { UpdateVacationDto } from 'src/dto/vacation/update';
import { VacationResponceDto } from 'src/dto/vacation/responce';
import { VacationTypeStatsDto, VacationEmployeeStatsDto, VacationMonthlyStatsDto } from 'src/dto/vacation/stats';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class VacationService {
    constructor(
        @InjectRepository(Vacation)
        private vacationRepository: Repository<Vacation>
    ){}

    private async checkOverlappingVacations(
        employeeId: number,
        startDate: Date,
        endDate: Date,
        excludeId: number = null,
    ): Promise<Vacation[]>{
        const queryBuilder = this.vacationRepository
            .createQueryBuilder('vacation')
            .where('vacation.employee_id = :employeeId', { employeeId })
            .andWhere(
            '(vacation.start_date BETWEEN :startDate AND :endDate OR ' +
            'vacation.end_Date BETWEEN :startDate AND :endDate OR ' +
            '(vacation.start_date <= :startDate AND vacation.end_Date >= :endDate))',
            { startDate, endDate }
            );
        if(excludeId){
            queryBuilder.andWhere('vacation.id != :excludeId', { excludeId });
        }

        return queryBuilder.getMany();
        
    }

    async findALl(): Promise<Vacation[]>{
        return this.vacationRepository.find({
            relations: ['employee'],
        });
    }

    async findOne(id: number): Promise<Vacation>{
        const vacation = await this.vacationRepository.findOne({
            where: { id },
            relations: ['employee'],
        })

        if(!vacation){
            throw new NotFoundException(`Vacation with ID ${id} not found`);
        }

        return vacation;
    }

    async findByEmployee(employeeId: number): Promise<Vacation[]>{
        return this.vacationRepository.find({
            where: { employee_id: employeeId },
            order: {
                start_date: 'DESC',
            }
        });
    }

    async findByDateRange(startDate: Date, endDate: Date): Promise<Vacation[]>{
        return this.vacationRepository.find({
            where: [
                {
                    start_date: Between(startDate, endDate),
                },
                {
                    end_Date: Between(startDate, endDate),
                },
                {
                    start_date: LessThanOrEqual(startDate),
                    end_Date: MoreThanOrEqual(endDate),
                }
            ],
            relations: ['employee']
        });
    }

    async findVacationType(vacationType: string): Promise<Vacation[]>{
        return this.vacationRepository.find({
            where: { vacation_type: vacationType },
            relations: ['employee'],
        })
    }

    async findCurrentVacations(): Promise<Vacation[]>{
        const today = new Date();
        return this.vacationRepository.find({
            where: {
                start_date: LessThanOrEqual(today),
                end_Date: MoreThanOrEqual(today),
            },
            relations: ['employee'],
        });
    }

    async findUpcomingVacations(days: number = 30): Promise<Vacation[]>{
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + days);
        return this.vacationRepository.find({
            where: {
                start_date: Between(today, futureDate),
            },
            relations: ['employee'],
            order: {
                start_date: 'ASC',
            },
        });
    }

    async create(createVacationDate: CreateVacationDto): Promise<Vacation>{
        if(createVacationDate.start_date && createVacationDate.end_date){
            const startDate = new Date(createVacationDate.start_date);
            const end_Date = new Date(createVacationDate.end_date);

            if(startDate > end_Date){
                throw new BadRequestException('Start date cannot be after end date');
            }
        }

        if(createVacationDate.employementId && createVacationDate.start_date && createVacationDate.end_date){
            const overlappingVacations = await this.checkOverlappingVacations(
                createVacationDate.employementId,
                new Date(createVacationDate.start_date),
                new Date(createVacationDate.end_date),
                null,
            );

            if(overlappingVacations.length > 0){
                throw new BadRequestException('This vacation overlaps with existing vacations for this employee');
            }
        }

        const vacation = this.vacationRepository.create(createVacationDate);
        const savedVacation = await this.vacationRepository.save(vacation);

        return this.findOne(savedVacation.id);
    }

    async update(
        id: number,
        updateVacationData: UpdateVacationDto,
    ): Promise<Vacation>{
        const vacation = await this.findOne(id);

        if(updateVacationData.start_date && updateVacationData.end_date){
            const startDate = new Date(updateVacationData.start_date);
            const endDate = new Date(updateVacationData.end_date);

            if(startDate > endDate){
                throw new BadRequestException('Start date cannot be after end date');
            }
        } else if(updateVacationData.start_date && !updateVacationData.end_date) {
            const startDate = new Date(updateVacationData.start_date);
            const endDate = new Date(vacation.end_Date);

            if(startDate > endDate){
                throw new BadRequestException('Start date cannot be after end date');
            }
        } else if(!updateVacationData.start_date && updateVacationData.end_date){
            const startDate = new Date(vacation.start_date);
            const endDate = new Date(vacation.end_Date);

            if(startDate > endDate){
                throw new BadRequestException('Start date cannot be after end date');
            }
        }

        if((updateVacationData.start_date || updateVacationData.end_date || updateVacationData.employementId) && (vacation.employee_id || updateVacationData.employementId)){
            const employeeId = updateVacationData.employementId || vacation.employee_id;
            const startDate = updateVacationData.start_date ? new Date(updateVacationData.start_date): new Date(vacation.start_date);
            const endDate = updateVacationData.end_date ? new Date(updateVacationData.end_date): new Date(vacation.end_Date);

            const overlappingVacations = await this.checkOverlappingVacations(
                employeeId,
                startDate,
                endDate,
                id,
            );

            if(overlappingVacations.length > 0) {
                throw new BadRequestException('This vacation overlaps with existing vacations for this employee')
            }
        }

        Object.assign(vacation, updateVacationData);
        await this.vacationRepository.save(vacation);

        return this.vacationRepository.save(vacation);
    }

    async remove(id: number): Promise<void>{
        const vacation = await this.findOne(id);
        await this.vacationRepository.remove(vacation);
    }

    async getVacationStatsByType(): Promise<VacationTypeStatsDto[]>{
        const stats = await this.vacationRepository
            .createQueryBuilder('vacation')
            .select('vacation.vacation_type', 'type')
            .addSelect('COUNT(vacation.id)', 'count')
            .addSelect('AVG(DATEDIFF(vacation.end_Date, vacation.start_date) + 1)', 'avgDuration')
            .groupBy('vacation.vacation_type')
            .getRawMany();
        
        return plainToInstance(VacationTypeStatsDto, stats, {
            excludeExtraneousValues: true,
        })
    }

    async getVacationStatsByEmployee(employeeId: number): Promise<VacationEmployeeStatsDto>{
        const totalCount = await this.vacationRepository.count({
            where: { employee_id: employeeId },
        });

        const paidCount = await this.vacationRepository.count({
            where: {
                employee_id: employeeId,
                is_paid: true,
            },
        });

        const unpaidCount = await this.vacationRepository.count({
            where: {
                employee_id: employeeId,
                is_paid: false,
            }
        })

        const vacationDuration = await this.vacationRepository
            .createQueryBuilder('vacation')
            .select('SUM(DATEDIFF(vacation.end_Date, vacation.start_date) + 1)', 'totalDays')
            .where('vacation.employee_id = :employeeId', { employeeId })
            .getRawOne();

        const paidDuration = await this.vacationRepository
            .createQueryBuilder('vacation')
            .select('SUM(DATEDIFF(vacation.end_Date, vacation.start_date) + 1)', 'paidDays')
            .where('vacation.employee_id = :employeeId AND vacation.is_paid = :isPaid', { 
                employeeId,
                isPaid: true,
            })
            .getRawOne();

        const stats = {
            totalCount,
            paidCount,
            unpaidCount,
            totalDays: vacationDuration.totalDays ? parseInt(vacationDuration.totalDays) : 0,
            paidDays: paidDuration.paidDays ? parseInt(paidDuration.paidDays) : 0,
            unpaidDays: vacationDuration.totalDays && paidDuration.paidDays ? parseInt(vacationDuration.totalDays) - parseInt(paidDuration.paidDays) : 0,
        };

        return plainToInstance(VacationEmployeeStatsDto, stats, {
            excludeExtraneousValues: true,
        })
    }

    async getVacationStatsByMonth(): Promise<VacationMonthlyStatsDto[]>{
        const monthlyStats = await this.vacationRepository
            .createQueryBuilder('vacation')
            .select('MONTH(vacation.start_date)', 'month')
            .addSelect('YEAR(vacation.start_date)', 'year')
            .addSelect('COUNT(vacation.id)', 'count')
            .groupBy('YEAR(vacation.start_date), MONTH(vacation.start_date)')
            .orderBy('year', 'ASC')
            .addOrderBy('month', 'ASC')
            .getRawMany();

        return plainToInstance(VacationMonthlyStatsDto, monthlyStats, {
            excludeExtraneousValues: true,
        })
    }

    toResponseDto(vacation: Vacation): VacationResponceDto{
        return plainToInstance(VacationResponceDto, vacation, {
            excludeExtraneousValues: true,
        })
    }

    toReponseDtoArray(vacations: Vacation[]): VacationResponceDto[]{
        return plainToInstance(VacationResponceDto, vacations, {
            excludeExtraneousValues: true,
        })
    }
}
