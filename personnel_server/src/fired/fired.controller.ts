import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { FiredService } from './fired.service';
import { Fired } from 'src/entity/fired';

@Controller('fired')
export class FiredController {
    constructor(private readonly firedService: FiredService) {}

    @Post()
    create(@Body() firedData: Partial<Fired>): Promise<Fired>{
        return this.firedService.create(firedData);
    }

    @Get()
    findAll(): Promise<Fired[]>{
        return this.firedService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Fired>{
        return this.firedService.findOne(Number(id));
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() firedData: Partial<Fired>){
        return this.firedService.update(Number(id), firedData);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.firedService.remove(Number(id));
    }
}
