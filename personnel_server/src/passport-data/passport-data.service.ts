import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassportData } from 'src/entity/passport-data';
import { CreatePassportDataDto } from 'src/dto/passport/create';
import { UpdatePassportDataDto } from 'src/dto/passport/update';
import { PassportDataResponceDto } from 'src/dto/passport/responce';

@Injectable()
export class PassportDataService {
    constructor(
        @InjectRepository(PassportData) 
        private passportDataRepository: Repository<PassportData>
    ){}

    async findAll(): Promise<PassportDataResponceDto[]>{
        const passports = await this.passportDataRepository.find({
            relations: ['employee'],
        });

        return passports.map(passport => new PassportDataResponceDto(passport));
    }

    async findOne(id: number): Promise<PassportDataResponceDto>{
        const passportData = await this.passportDataRepository.findOne({
            where: { id },
            relations: [ 'employee' ]
        });

        if(!passportData){
            throw new NotFoundException(`Passport data with ID ${id} not found`);
        }

        return new PassportDataResponceDto(passportData);
    }

    async findByEmployee(employeeId: number): Promise<PassportDataResponceDto>{
        const passportData = await this.passportDataRepository.findOne({
            where: { employeeId },
            relations: ['employee'],
        });

        if(!passportData){
            throw new NotFoundException(`Passport data for employee with ID ${employeeId} not found`);
        }

        return new PassportDataResponceDto(passportData);
    }

    async findByPassportNumber(passport: string): Promise<PassportDataResponceDto>{
        const passportData = await this.passportDataRepository.findOne({
            where: { passport },
            relations: ['employee'],
        });

        if(!passportData){
            throw new NotFoundException(`Passport data with number ${passport} not found`);
        }

        return new PassportDataResponceDto(passportData);
    }

    async create(passportDataDto: CreatePassportDataDto): Promise<PassportDataResponceDto>{
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
        const savedPassport = await this.passportDataRepository.save(passportData);
        return new PassportDataResponceDto(savedPassport);
    }

    async update(
        id: number,
        passportDataDto: UpdatePassportDataDto,
    ): Promise<PassportDataResponceDto>{
        const passportData = await this.findOne(id);

        if(passportDataDto.passport && passportDataDto.passport !== passportData.passport){
            const existingPassport = await this.passportDataRepository.findOne({
                where: { passport: passportDataDto.passport }
            });

            if(existingPassport && existingPassport.id !== id){
                throw new ConflictException(`Passport with number ${passportDataDto.passport} already exist`);
            }
        }

        if(passportDataDto.employeeId && passportDataDto.employeeId !== passportDataDto.employeeId){
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

        const updatePassport = await this.passportDataRepository.save(passportData);
        return new PassportDataResponceDto(updatePassport);
    }

    async remove(id: number): Promise<void>{
        const passportData = await this.passportDataRepository.findOne({
            where: { id },
        });

        if(!passportData){
            throw new NotFoundException(`Passport data with ID ${id} not found`);
        }

        await this.passportDataRepository.remove(passportData)
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
