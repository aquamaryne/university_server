import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { Positions } from 'src/entity/positions';

@Controller('positions')
export class PositionsController {
    constructor(private readonly positionsService: PositionsService) {}

    @Get()
    findall(): Promise<Positions[]>{
        return this.positionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Positions>{
        return this.positionsService.findOne(Number(id));
    }

    @Post()
    create(@Body() positions: Positions): Promise<Positions>{
        return this.positionsService.create(positions);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() positions: Positions): Promise<Positions>{
        return this.positionsService.update(Number(id), positions);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.positionsService.remove(Number(id));
    }
}
