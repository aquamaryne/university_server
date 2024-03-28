import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FamilyService } from './family.service';
import { Family } from 'src/entity/family';

@Controller('family')
export class FamilyController {
    constructor(private readonly familyService: FamilyService){}

    @Post()
    create(@Body() family: Family): Promise<Family>{
        return this.familyService.create(family);
    }

    @Get()
    findAll(): Promise<Family[]>{
        return this.familyService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Family>{
        return this.familyService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() family: Family): Promise<Family>{
        return this.familyService.update(id, family);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void>{
        return this.familyService.remove(id);
    }
}
