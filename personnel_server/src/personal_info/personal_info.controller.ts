import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PersonalInfoService } from './personal_info.service';
import { PersonalInfo } from 'src/entity/personal-info';

@Controller('personal-info')
export class PersonalInfoController {
    constructor(private readonly personalInfoService: PersonalInfoService) {}

    @Get()
    findall(): Promise<PersonalInfo[]>{
        return this.personalInfoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<PersonalInfo>{
        return this.personalInfoService.findOne(Number(id));
    }

    @Post()
    create(@Body() personalInfo: Partial<PersonalInfo>): Promise<PersonalInfo>{
        return this.personalInfoService.create(personalInfo);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() personalInfo: Partial<PersonalInfo>): Promise<PersonalInfo>{
        return this.personalInfoService.update(Number(id), personalInfo);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.personalInfoService.remove(Number(id));
    }
}
