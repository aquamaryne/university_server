import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassportData } from 'src/entity/passport-data';

@Injectable()
export class PassportDataService {
    constructor(
        @InjectRepository(PassportData) 
        private passportDataRepository: Repository<PassportData>
    ){}

    async findAll(): Promise<PassportData[]>{
        return this.passportDataRepository.find({
            relations: ['employee'],
        })
    }

    async findOne(id: number): Promise<PassportData>{
        const passportData = await this.passportDataRepository.findOne({
            where: { id },
            relations: [ 'employee' ]
        });

        if(!passportData){
            throw new NotFoundException(`Passport data with ID ${id} not found`);
        }

        return passportData;
    }

    async findByEmployee(employeeId: number): Promise<PassportData>{
        const passportData = await this.passportDataRepository.findOne({
            where: { employeeId },
            relations: ['employee'],
        });

        if(!passportData){
            throw new NotFoundException(`Passport data for employee with ID ${employeeId} not found`);
        }

        return passportData;
    }

    async findByPassportNumber(passport: string): Promise<PassportData>{
        const passportData = await this.passportDataRepository.findOne({
            where: { passport },
            relations: ['employee'],
        });

        if(!passportData){
            throw new NotFoundException(`Passport data with number ${passport} not found`);
        }

        return passportData;
    }

    async create(passportDataDto: Partial<PassportData>): Promise<PassportData>{
        if(passportDataDto.passport){
            const existingPassport = await this.passportDataRepository.findOne({
                where: { passport: passportDataDto.passport },
            });

            if(existingPassport){
                throw new ConflictException(`Passport with number ${passportDataDto.passport} already exist`);
            }
        }

        if(passportDataDto.employeeId){
            const existingEmployeePassport = await this.passportDataRepository.findOne({
                where: { employeeId: passportDataDto.employeeId },
            });

            if(existingEmployeePassport){
                throw new ConflictException(`Employee with ID ${passportDataDto.employeeId} already has passport data`)
            }
        }

        const passportData = this.passportDataRepository.create(passportDataDto);
        return this.passportDataRepository.save(passportData);
    }

    async update(
        id: number,
        passportDataDto: Partial<PassportData>,
    ): Promise<PassportData>{
        const passportData = await this.findOne(id);
        if(passportDataDto.passport && passportDataDto.passport !== passportData.passport){
            const existingPassport = await this.passportDataRepository.findOne({
                where: { passport: passportDataDto.passport }
            });

            if(existingPassport && existingPassport.id !== id){
                throw new ConflictException(`Passport with number ${passportDataDto.passport} already exist`);
            }
        }

        if(passportDataDto.employeeId && passportDataDto.employeeId !== passportData.employeeId){
            const existingEmployeePassport = await this.passportDataRepository.findOne({
                where: { employeeId: passportDataDto.employeeId },
            });

            if(existingEmployeePassport && existingEmployeePassport.id !== id){
                throw new ConflictException(
                    `Employee with ID ${passportDataDto.employeeId} already has passport data`,
                );
            }
        }

        Object.assign(passportData, passportDataDto);
        return this.passportDataRepository.save(passportData);
    }

    async remove(id: number): Promise<void>{
        const passportData = await this.findOne(id);
        await this.passportDataRepository.remove(passportData);
    }

    async getPassportsIssuedByYear(): Promise<any[]>{
        return this.passportDataRepository
            .createQueryBuilder('passport')
            .select('YEAR(passport.passportDateIssued)', 'year')
            .addSelect('COUNT(passport.id)', 'count')
            .groupBy('YEAR(passport.passportDateIssued)')
            .orderBy('year', 'DESC')
            .getRawMany();
    }

    async getPassportsGroupedByIssuer(): Promise<any[]>{
        return this.passportDataRepository
            .createQueryBuilder('passport')
            .select('passport.passportIssuedBy', 'issuer')
            .addSelect('COUNT(passport.id)', 'count')
            .groupBy('passport.passportIssuedBy')
            .orderBy('count', 'DESC')
            .getRawMany();
    }
}
