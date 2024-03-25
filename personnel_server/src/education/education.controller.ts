import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EducationService } from './education.service';
import { Education } from 'src/entity/education';

@Controller('education')
export class EducationController {
    constructor(private readonly educationService: EducationService){}

    @Post()
    create(@Body() educationData: Partial<Education>): Promise<Education>{
        return this.educationService.create(educationData)
    }

    @Get()
    findAll(): Promise<Education[]>{
        return this.educationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Education>{
        return this.educationService.findOne(Number(id));
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() educationData: Partial<Education>): Promise<Education>{
        return this.educationService.update(Number(id), educationData);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.educationService.remove(Number(id));
    }
}
