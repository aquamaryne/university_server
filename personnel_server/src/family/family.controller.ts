import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { FamilyService } from './family.service';
import { CreateFamilyDto } from 'src/dto/family/create';
import { UpdateFamilyDto } from 'src/dto/family/update';
import { FamiltyResponceDto } from 'src/dto/family/responce';
@Controller('family')
export class FamilyController {
    constructor(private readonly familyService: FamilyService){}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createFamilyDto: CreateFamilyDto): Promise<FamiltyResponceDto>{
        const family = await this.familyService.create(createFamilyDto);
        return this.familyService.toRespondDto(family);
    }

    @Get()
    async findAll(): Promise<FamiltyResponceDto[]>{
        const families = await this.familyService.findAll();
        return families.map(family => this.familyService.toRespondDto(family));
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<FamiltyResponceDto>{
        const family = await this.familyService.findOne(id);
        return this.familyService.toRespondDto(family);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateFamilyDto: UpdateFamilyDto
    ): Promise<FamiltyResponceDto>{
        const family = await this.familyService.update(id, updateFamilyDto)
        return this.familyService.toRespondDto(family);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void>{
        return this.familyService.remove(id);
    }
}
