import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, Query, HttpException, HttpStatus } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from 'src/entity/location';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService){}

    @Get()
    findAll(): Promise<Location[]>{
        return this.locationService.findAll();
    }

    @Get('stats')
    getLocationStats(){
        return this.locationService.getLocationsStats();
    }

    @Get('top-birthplaces')
    getTopBirthPlaces(@Query('limit', ParseIntPipe) limit?: number): Promise<any[]>{
        return this.locationService.getTopBirthPlaces(limit);
    }

    @Get('search')
    findByName(@Query('name') name: string): Promise<Location[]>{
        if(!name){
            throw new HttpException('Parameter name required', HttpStatus.BAD_REQUEST);
        }

        return this.locationService.findByName(name);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Location>{
        return this.locationService.findOne(id);
    }

    @Post()
    create(@Body() locationData: Partial<Location>): Promise<Location>{
        return this.locationService.create(locationData);
    }

    @Post('bulk')
    bulkCreate(@Body() locations: Partial<Location[]>): Promise<Location[]>{
        return this.locationService.bulkCreate(locations);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() locationData: Partial<Location>
    ): Promise<Location>{
        return this.locationService.update(id, locationData);
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
