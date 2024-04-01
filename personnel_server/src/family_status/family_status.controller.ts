import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FamilyStatusService } from './family_status.service';
import { FamilyStatus } from 'src/entity/familyStatus';

@Controller('family-status')
export class FamilyStatusController {
    constructor(private readonly familyStatusService: FamilyStatusService) {}

    @Get()
    findAll(): Promise<FamilyStatus[]>{
        return this.familyStatusService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<FamilyStatus>{
        return this.familyStatusService.findOne(Number(id))
    }

    @Post()
    create(@Body() familyStatus: Partial<FamilyStatus>): Promise<FamilyStatus>{
        return this.familyStatusService.create(familyStatus);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() familyStatus: Partial<FamilyStatus>): Promise<FamilyStatus>{
        return this.familyStatusService.update(Number(id), familyStatus);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.familyStatusService.remove(Number(id));
    }

}
