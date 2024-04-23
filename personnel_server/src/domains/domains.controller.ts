import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { Domains } from 'src/entity/domains';

@Controller('domains')
export class DomainsController {
    constructor(private readonly domainsService: DomainsService) {}

    @Get()
    findAll(): Promise<Domains[]>{
        return this.domainsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Domains>{
        return this.domainsService.findOne(Number(id));
    }

    @Post()
    create(@Body() domains: Partial<Domains>): Promise<Domains>{
        return this.domainsService.create(domains);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() domains: Partial<Domains>): Promise<Domains>{
        return this.domainsService.update(Number(id), domains);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.domainsService.remove(Number(id));
    }

}
