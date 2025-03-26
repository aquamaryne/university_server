import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { Faculty } from 'src/entity/faculty';
import { ApiKeyGuard } from 'src/api_key/api_key.guard';

@Controller('faculty')
export class FacultyController {
    constructor(private readonly facultyService: FacultyService) {}

    @Get()
    findAll(): Promise<Faculty[]>{
        return this.facultyService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Faculty>{
        return this.facultyService.findOne(Number(id));
    }

    @Post()
    create(@Body() department: Partial<Faculty>): Promise<Faculty>{
        return this.facultyService.create(department);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() department: Partial<Faculty>): Promise<Faculty>{
        return this.facultyService.update(Number(id), department);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.facultyService.remove(Number(id));
    }
}
