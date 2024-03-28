import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
}
