import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Location } from 'src/entity/location';
import { CreateLocationDto } from 'src/dto/location/create';
import { UpdateLocationDto } from 'src/dto/location/update';
import { LocationResponceDto } from 'src/dto/location/responce';
import { LocationStatsDto, TopBirthPlaceDto } from 'src/dto/location/stats';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class LocationService {
    constructor(@InjectRepository(Location) private locaionRepository: Repository<Location>){}

    async findAll(): Promise<Location[]>{
        return this.locaionRepository.find({
            relations: ['birthPlace']
        });
    }

    async findOne(id: number): Promise<Location>{
        const location = this.locaionRepository.findOne({
            where: { id },
            relations: ['birthPlace'],
        });

        if(!location){
            throw new NotFoundException(`Location with ID ${id} not found`)
        }

        return location;
    }

    async findByName(name: string): Promise<Location[]>{
        return this.locaionRepository
            .createQueryBuilder('location')
            .leftJoinAndSelect('location.birthPlace', 'birthPlace')
            .where('location.name LIKE :name', { name: `%${name}%`})
            .getMany();
    }

    async create(createLocationDto: CreateLocationDto): Promise<Location>{
        const location = this.locaionRepository.create(createLocationDto);
        const savedLocation = await this.locaionRepository.save(location);
        return this.findOne(savedLocation.id);
    }

    async update(id: number, updateLocationDto: UpdateLocationDto): Promise<Location>{
        const location = await this.findOne(id);
        Object.assign(location, updateLocationDto);
        await this.locaionRepository.save(location);
        return this.locaionRepository.remove(location);
    }

    async remove(id: number): Promise<void>{
        const location = await this.findOne(id);
        if(location.birthPlace && location.birthPlace.length > 0){
            throw new Error(`Can't delete location`);
        }

        await this.locaionRepository.remove(location);
    }

    async getTopBirthPlaces(limit: number = 10): Promise<TopBirthPlaceDto[]>{
        const topPlaces = await this.locaionRepository
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
        
        return plainToInstance(TopBirthPlaceDto, topPlaces, {
            excludeExtraneousValues: true,
        })
    }

    async getLocationsStats(): Promise<LocationStatsDto>{
        const totalLocations = await this.locaionRepository.count();
        const topBirthPlaces = await this.getTopBirthPlaces(5);
        const unusedLocations = await this.locaionRepository
            .createQueryBuilder('location')
            .leftJoin('location.birthPlace', 'personalInfo')
            .select('COUNT(location.id)', 'count')
            .having('COUNT(personalInfo.id) = 0')
            .getRawOne();

        const stats = {
            totalLocations,
            topBirthPlaces,
            unusedLocations: unusedLocations ? parseInt(unusedLocations.count): 0
        };

        return plainToInstance(LocationStatsDto, stats, {
            excludeExtraneousValues: true,
        })
    }

    async bulkCreate(locations: CreateLocationDto[]): Promise<Location[]>{
        const locationEntities = this.locaionRepository.create(locations);
        const savedLocations = await this.locaionRepository.save(locationEntities);
        const locationIds = savedLocations.map(loc => loc.id); 
        return this.locaionRepository.find({
            where: { id: In(locationIds) },
            relations: ['birthPlace']
        })
    }

    toResponseDto(location: Location): LocationResponceDto{
        return plainToInstance(LocationResponceDto, location, {
            excludeExtraneousValues: true,
        })
    }
}
