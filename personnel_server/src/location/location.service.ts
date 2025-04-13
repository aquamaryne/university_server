import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from 'src/entity/location';

@Injectable()
export class LocationService {
    constructor(@InjectRepository(Location) private locaionRepository: Repository<Location>){}

    async findAll(): Promise<Location[]>{
        return this.locaionRepository.find();
    }

    async findOne(id: number): Promise<Location>{
        return this.locaionRepository.findOne({
            where: { id },
            relations: ['birthPlace'],
        });
    }

    async findByName(name: string): Promise<Location[]>{
        return this.locaionRepository
            .createQueryBuilder('location')
            .where('location.name LIKE :name', { name: `%${name}%`})
            .getMany();
    }

    async create(locationData: Partial<Location>): Promise<Location>{
        const location = this.locaionRepository.create(locationData);
        return this.locaionRepository.save(location);
    }

    async update(id: number, locationData: Partial<Location>): Promise<Location>{
        await this.findOne(id);
        await this.locaionRepository.create(locationData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        const location = await this.findOne(id);
        if(location.birthPlace && location.birthPlace.length > 0){
            throw new Error(`Can't delete location`);
        }

        await this.locaionRepository.remove(location);
    }

    async getTopBirthPlaces(limit: number = 10): Promise<any[]>{
        return this.locaionRepository
            .createQueryBuilder('location')
            .leftJoin('location.birthPlace', 'personalInfo')
            .select('location.id', 'id')
            .addSelect('location.name', 'name')
            .addSelect('COUNT(personalInfo.id)', 'employeeCount')
            .groupBy('location.id')
            .having('COUNT(personalInfo.id) > 0')
            .orderBy('employeeCount', 'DESC')
            .limit(limit)
            .getRawMany();
    }

    async getLocationsStats(): Promise<any>{
        const totalLocations = await this.locaionRepository.count();
        const topBirthPlaces = await this.getTopBirthPlaces(5);
        const unusedLocations = await this.locaionRepository
            .createQueryBuilder('location')
            .leftJoin('location.birthPlace', 'personalInfo')
            .select('COUNT(location.id)', 'count')
            .having('COUNT(personalInfo.id) = 0')
            .getRawOne();

        return {
            totalLocations,
            topBirthPlaces,
            unusedLocations: unusedLocations ? parseInt(unusedLocations.count): 0
        };
    }

    async bulkCreate(locations: Partial<Location>[]): Promise<Location[]>{
        const locationEntities = this.locaionRepository.create(locations);
        return this.locaionRepository.save(locationEntities);
    }
}
