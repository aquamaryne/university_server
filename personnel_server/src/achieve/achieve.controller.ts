import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AchieveService } from './achieve.service';
import { Achieve } from 'src/entity/achieve';

@Controller('achieve')
export class AchieveController {
    constructor(private readonly achieveService: AchieveService) {}

    @Post()
    create(@Body() achhieveData: Partial<Achieve>): Promise<Achieve>{
        return this.achieveService.create(achhieveData);
    }

    @Get()
    findAll(): Promise<Achieve[]>{
        return this.achieveService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Achieve>{
        return this.achieveService.findOne(Number(id));
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() achieveData: Partial<Achieve>): Promise<Achieve>{
        return this.achieveService.update(Number(id), achieveData);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.achieveService.remove(Number(id));
    }
}
