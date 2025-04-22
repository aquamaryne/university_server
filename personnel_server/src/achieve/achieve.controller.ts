import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AchieveService } from './achieve.service';
import { ApiKeyGuard } from 'src/api_key/api_key.guard';
import { CreateAchieveDto } from 'src/dto/achieve/create';
import { UpdateAchieveDto } from 'src/dto/achieve/update';
import { ResponceAchieveDto } from 'src/dto/achieve/responce';

@Controller('achieve')
export class AchieveController {
    constructor(private readonly achieveService: AchieveService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createAchhieveData: CreateAchieveDto): Promise<ResponceAchieveDto>{
        const achieve = await this.achieveService.create(createAchhieveData);
        return this.achieveService.toResponceDto(achieve);
    }

    @Get()
    async findAll(): Promise<ResponceAchieveDto[]>{
        const achieves = await this.achieveService.findAll();
        return achieves.map(achieve => this.achieveService.toResponceDto(achieve));
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ResponceAchieveDto>{
        const achieve = await this.achieveService.findOne(id);
        return this.achieveService.toResponceDto(achieve);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(
        @Param('id') id: number, 
        @Body() updateAchieveData: UpdateAchieveDto
    ): Promise<ResponceAchieveDto>{
        const achieve = await this.achieveService.update(id, updateAchieveData);
        return this.achieveService.toResponceDto(achieve);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void>{
        return this.achieveService.remove(Number(id));
    }
}
