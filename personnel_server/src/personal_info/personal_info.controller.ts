import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { PersonalInfoService } from './personal_info.service';
import { PersonalInfo } from 'src/entity/personal-info';
import { CreatePersonalInfoDto } from 'src/dto/personal-info/create';
import { UpdatePersonalInfoDto } from 'src/dto/personal-info/update';
import { PersonalInfoResponceDto } from 'src/dto/personal-info/repsonce';
@Controller('personal-info')
export class PersonalInfoController {
    constructor(private readonly personalInfoService: PersonalInfoService) {}

    @Get()
    async findall(): Promise<PersonalInfoResponceDto[]>{
        const personalInfo = await this.personalInfoService.findAll();
        return personalInfo.map(info => this.personalInfoService.toResonseDto(info));
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<PersonalInfoResponceDto>{
        const personalInfo = await this.personalInfoService.findOne(id);
        return this.personalInfoService.toResonseDto(personalInfo);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createPersonalInfoDto: CreatePersonalInfoDto): Promise<PersonalInfoResponceDto>{
        const personalInfo = await this.personalInfoService.create(createPersonalInfoDto);
        return this.personalInfoService.toResonseDto(personalInfo);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updatePersonalInfoDto: UpdatePersonalInfoDto
    ): Promise<PersonalInfoResponceDto>{
        const personalInfo = await this.personalInfoService.update(id, updatePersonalInfoDto);
        return this.personalInfoService.toResonseDto(personalInfo);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.personalInfoService.remove(Number(id));
    }
}
