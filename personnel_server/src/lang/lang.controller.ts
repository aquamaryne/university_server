import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LangService } from './lang.service';
import { Language } from 'src/entity/lang';

@Controller('lang')
export class LangController {
    constructor(private readonly languageService: LangService) {}

    @Post()
    create(@Body() languageData: Partial<Language>): Promise<Language>{
        return this.languageService.create(languageData);
    }

    @Get()
    findAll(): Promise<Language[]>{
        return this.languageService.findALl();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Language>{
        return this.languageService.findOne(Number(id));
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() languageData: Partial<Language>): Promise<Language>{
        return this.languageService.update(Number(id), languageData);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.languageService.remove(Number(id));
    }
}