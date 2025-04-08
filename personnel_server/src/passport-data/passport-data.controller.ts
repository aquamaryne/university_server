import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { PassportDataService } from './passport-data.service';
import { PassportData } from 'src/entity/passport-data';
import { CreatePassportDataDto } from 'src/dto/passport/create';
import { UpdatePassportDataDto } from 'src/dto/passport/update';
import { PassportDataResponceDto } from 'src/dto/passport/responce';

@Controller('passport-data')
export class PassportDataController {
    constructor(private readonly passportDataService: PassportDataService){}

    @Post()
    create(@Body() passportDataDto: Partial<PassportData>): Promise<PassportData>{
        return this.passportDataService.create(passportDataDto);
    }

    @Get()
    findAll(): Promise<PassportData[]>{
        return this.passportDataService.findAll();
    }

    @Get('stats/by-year')
    getPassportsIssuedByYear(){
        return this.passportDataService.getPassportsIssuedByYear();
    }

    @Get('stats/by-issuer')
    getPassportsGroupedByIssuer(){
        return this.passportDataService.getPassportsGroupedByIssuer();
    }

    @Get('search')
    findByPassportNumber(@Query('number') passport: string): Promise<PassportData>{
        return this.passportDataService.findByPassportNumber(passport);
    }

    @Get('employee/:employeeId')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<PassportData>{
        return this.passportDataService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() passportDataDto: Partial<PassportData>
    ): Promise<PassportData>{
        return this.passportDataService.update(id, passportDataDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.passportDataService.remove(id);
    }
}
