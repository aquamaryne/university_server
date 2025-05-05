import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from 'src/dto/position/create';
import { UpdatePositionDto } from 'src/dto/position/update';
import { PositionResponceDto } from 'src/dto/position/responce';
@Controller('positions')
export class PositionsController {
    constructor(private readonly positionsService: PositionsService) {}

    @Get()
    async findall(): Promise<PositionResponceDto[]>{
        const position = await this.positionsService.findAll();
        return position.map(pos => this.positionsService.toResposeDto(pos));
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<PositionResponceDto>{
        const position = await this.positionsService.findOne(id);
        return this.positionsService.toResposeDto(position);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createPositionDto: CreatePositionDto): Promise<PositionResponceDto>{
        const position = await this.positionsService.create(createPositionDto);
        return this.positionsService.toResposeDto(position);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(
        @Param('id') id: number, 
        @Body() updatePositionDto: UpdatePositionDto
    ): Promise<PositionResponceDto>{
        const position = await this.positionsService.update(id, updatePositionDto);
        return this.positionsService.toResposeDto(position);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.positionsService.remove(id);
    }
}
