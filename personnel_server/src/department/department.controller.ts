import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department } from 'src/entity/department';

@Controller('department')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {}

    @Get()
    findAll(): Promise<Department[]>{
        return this.departmentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Department>{
        return this.departmentService.findOne(Number(id));
    }

    @Post()
    create(@Body() domains: Partial<Department>): Promise<Department>{
        return this.departmentService.create(domains);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() domains: Partial<Department>): Promise<Department>{
        return this.departmentService.update(Number(id), domains);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.departmentService.remove(Number(id));
    }

}
