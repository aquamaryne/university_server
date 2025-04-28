import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { Faculty } from 'src/entity/faculty';
import { CreateFacultyDto } from 'src/dto/faculty/create';
import { FacultyResponceDto } from 'src/dto/faculty/responce';
import { UpdateFacultyDto } from 'src/dto/faculty/update';
import { ApiKeyGuard } from 'src/api_key/api_key.guard';

@Controller('faculty')
export class FacultyController {
    constructor(private readonly facultyService: FacultyService) {}

    @Get()
    async findAll(): Promise<FacultyResponceDto[]>{
        const faculties = await this.facultyService.findAll();
        return faculties.map(faculty => this.facultyService.toResponceDto(faculty));
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<FacultyResponceDto>{
        const faculty = await this.facultyService.findOne(id);
        return this.facultyService.toResponceDto(faculty);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createFacultyDto: CreateFacultyDto): Promise<FacultyResponceDto>{
        const faculty = await this.facultyService.create(createFacultyDto);
        return this.facultyService.toResponceDto(faculty);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(
        @Param('id') id: number, 
        @Body() updateFacultyDto: UpdateFacultyDto
    ): Promise<FacultyResponceDto>{
        const faculty = await this.facultyService.update(id, updateFacultyDto);
        return this.facultyService.toResponceDto(faculty);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.facultyService.remove(Number(id));
    }
}
