import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from 'src/dto/education/create';
import { UpdateEducationDto } from 'src/dto/education/update';
import { EducationResponceDto } from 'src/dto/education/responce';
@Controller('education')
export class EducationController {
    constructor(private readonly educationService: EducationService){}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createEducationDto: CreateEducationDto): Promise<EducationResponceDto>{
        const education = await this.educationService.create(createEducationDto);
        return this.educationService.toRespondDto(education);
    }

    @Get()
    async findAll(): Promise<EducationResponceDto[]>{
        const educations = await this.educationService.findAll();
        return educations.map(edu => this.educationService.toRespondDto(edu));
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<EducationResponceDto>{
        const education = await this.educationService.findOne(id);
        return this.educationService.toRespondDto(education);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(
        @Param('id') id: number, 
        @Body() updateEducationDto: UpdateEducationDto
    ): Promise<EducationResponceDto>{
        const education = await this.educationService.update(id, updateEducationDto);
        return this.educationService.toRespondDto(education);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.educationService.remove(id);
    }
}
