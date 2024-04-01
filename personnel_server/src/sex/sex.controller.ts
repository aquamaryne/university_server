import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SexService } from './sex.service';
import { Sex } from 'src/entity/sex';

@Controller('sex')
export class SexController {
    constructor(private readonly sexService: SexService) {}

    @Get()
    findAll(): Promise<Sex[]>{
        return this.sexService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Sex>{
        return this.sexService.findOne(Number(id));
    }

    @Post()
    create(@Body() sex: Partial<Sex>): Promise<Sex>{
        return this.sexService.create(sex);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() sex: Partial<Sex>): Promise<Sex>{
        return this.sexService.update(Number(id), sex);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.sexService.remove(id);
    }
}
