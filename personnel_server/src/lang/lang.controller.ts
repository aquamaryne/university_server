import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { LangService } from './lang.service';
import { EmployeeLanguage } from 'src/entity/lang';
import { CreateLanguageDto } from 'src/dto/lang/create';
import { UpdateLanguageDto } from 'src/dto/lang/update';
import { LanguageResponceDto } from 'src/dto/lang/responce';
@Controller('lang')
export class LangController {
    constructor(private readonly languageService: LangService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createLanguageDto: CreateLanguageDto): Promise<LanguageResponceDto>{
        const language = await this.languageService.create(createLanguageDto);
        return this.languageService.toResponseDto(language);
    }

    @Get()
    async findAll(): Promise<LanguageResponceDto[]>{
        const language = await this.languageService.findALl()
        return language.map(language => this.languageService.toResponseDto(language));
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<LanguageResponceDto>{
        const language = await this.languageService.findOne(id);
        return this.languageService.toResponseDto(language);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateLanguageDto: UpdateLanguageDto
    ): Promise<LanguageResponceDto>{
        const language = await this.languageService.update(id, updateLanguageDto);
        return this.languageService.toResponseDto(language);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.languageService.remove(Number(id));
    }
}
