import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department } from 'src/entity/department';
import { ApiKeyGuard } from 'src/api_key/api_key.guard';

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
    create(@Body() department: Partial<Department>): Promise<Department>{
        return this.departmentService.create(department);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() department: Partial<Department>): Promise<Department>{
        return this.departmentService.update(Number(id), department);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.departmentService.remove(Number(id));
    }
}
