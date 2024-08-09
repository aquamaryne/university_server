import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { EmployeersService } from './employeers.service';
import { Employeers } from 'src/entity/employeers';

@Controller('employeers')
export class EmployeersController {
    constructor(private readonly employeerService: EmployeersService) {}

    @Get()
    findAll(): Promise<Employeers[]>{
        return this.employeerService.findAll();
    }

    @Post()
    create(@Body() employeer: Employeers): Promise<Employeers>{
        return this.employeerService.create(employeer);
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Employeers>{
        return this.employeerService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() employeer: Employeers): Promise<Employeers>{
        return this.employeerService.update(id, employeer);
    }

    @Delete(':id')
    remove(@Param('id') id: string ): Promise<void>{
        return this.employeerService.softRemove(Number(id));
    }

    @Post(':id/restore')
    async restore(@Param('id', ParseIntPipe) includeDelete: boolean): Promise<Employeers[]>{
        return this.employeerService.getAllEmployeers(includeDelete);
    }

    @Get()
    async getAll(@Query('includeDeleted') includeDeleted: boolean): Promise<Employeers[]>{
        return this.employeerService.getAllEmployeers(includeDeleted);
    }
}
