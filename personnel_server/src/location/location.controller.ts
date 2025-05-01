import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, Query, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from 'src/entity/location';
import { CreateLocationDto } from 'src/dto/location/create';
import { UpdateLocationDto } from 'src/dto/location/update';
import { LocationResponceDto } from 'src/dto/location/responce';
import { LocationStatsDto, TopBirthPlaceDto } from 'src/dto/location/stats';
import { BulkCreateLocationDto } from 'src/dto/location/bulk-create';
@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService){}

    @Get()
    async findAll(): Promise<LocationResponceDto[]>{
        const locations = await this.locationService.findAll();
        return locations.map(location => this.locationService.toResponseDto(location));
    }

    @Get('stats')
    getLocationStats(): Promise<LocationStatsDto>{
        return this.locationService.getLocationsStats();
    }

    @Get('top-birthplaces')
    getTopBirthPlaces(@Query('limit', ParseIntPipe) limit?: number): Promise<TopBirthPlaceDto[]>{
        return this.locationService.getTopBirthPlaces(limit);
    }

    @Get('search')
    async findByName(@Query('name') name: string): Promise<LocationResponceDto[]>{
        if(!name){
            throw new HttpException('Parameter name required', HttpStatus.BAD_REQUEST);
        }
        const location = await this.locationService.findByName(name);
        return location.map(loc => this.locationService.toResponseDto(loc));
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<LocationResponceDto>{
        const location = await this.locationService.findOne(id);
        return this.locationService.toResponseDto(location);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createLocationDto: CreateLocationDto): Promise<LocationResponceDto>{
        const location = await this.locationService.create(createLocationDto);
        return this.locationService.toResponseDto(location);
    }

    @Post('bulk')
    @UsePipes(new ValidationPipe({ transform: true }))
    async bulkCreate(@Body() bulkCreateDto: BulkCreateLocationDto): Promise<LocationResponceDto[]>{
        const locations = await this.locationService.bulkCreate(bulkCreateDto.locations);
        return locations.map(location => this.locationService.toResponseDto(location));
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateLocationDto: UpdateLocationDto
    ): Promise<LocationResponceDto>{
        const location = await this.locationService.update(id, updateLocationDto);
        return this.locationService.toResponseDto(location);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }>{
        try{
            await this.locationService.remove(id);
            return { message: `Location with ID ${id} is deleted` }
        } catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
