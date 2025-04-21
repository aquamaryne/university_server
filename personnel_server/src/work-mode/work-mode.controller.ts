import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, Query, HttpException, HttpStatus, UsePipes, ValidationPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { WorkModeService } from './work-mode.service';
import { WorkMode } from 'src/entity/work-mode';
import { CreateWorkModeDto } from 'src/dto/work-mode/create';
import { UpdateWorkModeDto } from 'src/dto/work-mode/update';
import { ResponceWorkModeDto } from 'src/dto/work-mode/responce';
import { WorkModeStatsDto, PopularWorkModeDto } from 'src/dto/work-mode/stats';
@Controller('work-mode')
@UseInterceptors(ClassSerializerInterceptor)
export class WorkModeController {
    constructor(private readonly workModeService: WorkModeService){}

    @Get()
    async findAll(): Promise<ResponceWorkModeDto[]>{
        const workModes = await this.workModeService.findAll();
        return this.workModeService.toResponceDtoArray(workModes);
    }

    @Get('stats')
    getWorkModeStats(){
        return this.workModeService.getWorkModeStats();
    }

    @Get('search')
    async findByName(@Query('name') name: string): Promise<ResponceWorkModeDto[]>{
        if(!name){
            throw new HttpException(`Parameter name is required`, HttpStatus.BAD_REQUEST);
        }
        const workModes = await this.workModeService.findByName(name);
        return this.workModeService.toResponceDtoArray(workModes);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponceWorkModeDto>{
        const workMode = await this.workModeService.findOne(id);
        return this.workModeService.toResponceDto(workMode);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createWorkModeData: CreateWorkModeDto): Promise<ResponceWorkModeDto>{
        const workMode = await this.workModeService.create(createWorkModeData);
        return this.workModeService.toResponceDto(workMode);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateWorkModeDto: UpdateWorkModeDto
    ): Promise<ResponceWorkModeDto>{
        const workMode = await this.workModeService.update(id, updateWorkModeDto);
        return this.workModeService.toResponceDto(workMode);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }>{
        try{
            await this.workModeService.remove(id);
            return { message: `Work mode with ID ${id} is deleted` };
        } catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
