import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Vacation } from 'src/entity/vacation';

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

    async create(vacationDate: Partial<Vacation>): Promise<Vacation>{
        if(vacationDate.start_date && vacationDate.end_Date){
            const startDate = new Date(vacationDate.start_date);
            const end_Date = new Date(vacationDate.end_Date);

            if(startDate > end_Date){
                throw new BadRequestException('Start date cannot be after end date');
            }
        }

        if(vacationDate.employee_id && vacationDate.start_date && vacationDate.end_Date){
            const overlappingVacations = await this.checkOverlappingVacations(
                vacationDate.employee_id,
                new Date(vacationDate.start_date),
                new Date(vacationDate.end_Date),
                null,
            );

            if(overlappingVacations.length > 0){
                throw new BadRequestException('This vacation overlaps with existing vacations for this employee');
            }
        }

        const vacation = this.vacationRepository.create(vacationDate);
        return this.vacationRepository.save(vacation);
    }

    async update(
        id: number,
        vacationData: Partial<Vacation>,
    ): Promise<Vacation>{
        const vacation = await this.findOne(id);
        if(vacationData.start_date && vacationData.end_Date){
            const startDate = new Date(vacationData.start_date);
            const endDate = new Date(vacationData.end_Date);

            if(startDate > endDate){
                throw new BadRequestException('Start date cannot be after end date');
            }
        } else if(vacationData.start_date && !vacationData.end_Date) {
            const startDate = new Date(vacationData.start_date);
            const endDate = new Date(vacation.end_Date);

            if(startDate > endDate){
                throw new BadRequestException('Start date cannot be after end date');
            }
        } else if(!vacationData.start_date && vacationData.end_Date){
            const startDate = new Date(vacation.start_date);
            const endDate = new Date(vacation.end_Date);

            if(startDate > endDate){
                throw new BadRequestException('Start date cannot be after end date');
            }
        }

        if((vacationData.start_date || vacationData.end_Date || vacationData.employee_id) && (vacation.employee_id || vacationData.employee_id)){
            const employeeId = vacationData.employee_id || vacation.employee_id;
            const startDate = vacationData.start_date ? new Date(vacationData.start_date): new Date(vacation.start_date);
            const endDate = vacationData.end_Date ? new Date(vacationData.end_Date): new Date(vacation.end_Date);

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

        Object.assign(vacation, vacationData);

        return this.vacationRepository.save(vacation);
    }

    async remove(id: number): Promise<void>{
        const vacation = await this.findOne(id);
        await this.vacationRepository.remove(vacation);
    }

    async getVacationStatsByType(): Promise<any[]>{
        return this.vacationRepository
            .createQueryBuilder('vacation')
            .select('vacation.vacation_type', 'type')
            .addSelect('COUNT(vacation.id)', 'count')
            .addSelect('AVG(DATEDIFF(vacation.end_Date, vacation.start_date) + 1)', 'avgDuration')
            .groupBy('vacation.vacation_type')
            .getRawMany();
    }

    async getVacationStatsByEmployee(employeeId: number): Promise<any>{
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

        return {
            totalCount,
            paidCount,
            unpaidCount,
            totalDays: vacationDuration.totalDays ? parseInt(vacationDuration.totalDays) : 0,
            paidDays: paidDuration.paidDays ? parseInt(paidDuration.paidDays) : 0,
            unpaidDays: vacationDuration.totalDays && paidDuration.paidDays ? parseInt(vacationDuration.totalDays) - parseInt(paidDuration.paidDays) : 0,
        };
    }

    async getVacationStatsByMonth(): Promise<any[]>{
        return this.vacationRepository
            .createQueryBuilder('vacation')
            .select('MONTH(vacation.start_date)', 'month')
            .addSelect('YEAR(vacation.start_date)', 'year')
            .addSelect('COUNT(vacation.id)', 'count')
            .groupBy('YEAR(vacation.start_date), MONTH(vacation.start_date)')
            .orderBy('year', 'ASC')
            .addOrderBy('month', 'ASC')
            .getRawMany();
    }
}
