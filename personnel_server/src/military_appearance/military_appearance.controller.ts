import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MilitaryAppearanceService } from './military_appearance.service';
import { Military_Appearance } from 'src/entity/militaryAppearance';

@Controller('military-appearance')
export class MilitaryAppearanceController {
    constructor(private readonly militaryAppearanceService: MilitaryAppearanceService) {}

    @Get()
    findAll(): Promise<Military_Appearance[]>{
        return this.militaryAppearanceService.findAll();
    }

    @Get(':id')
    findOne(@Param('id')id: string): Promise<Military_Appearance>{
        return this.militaryAppearanceService.findById(Number(id))
    }

    @Post()
    create(@Body() militaryAppearance: Partial<Military_Appearance>): Promise<Military_Appearance>{
        return this.militaryAppearanceService.create(militaryAppearance);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() militaryAppearanceData: Partial<Military_Appearance>): Promise<Military_Appearance>{
        return this.militaryAppearanceService.update(Number(id), militaryAppearanceData);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.militaryAppearanceService.delete(Number(id));
    }
}
