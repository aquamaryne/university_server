import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentCreateDto } from 'src/dto/department/create';
import { DepartmentUpdateDto } from 'src/dto/department/update';
import { ResponceDepartmentDto } from 'src/dto/department/responce';
@Controller('department')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {}

    @Get()
    async findAll(): Promise<ResponceDepartmentDto[]>{
        const departments = await this.departmentService.findAll();
        return departments.map(dept => this.departmentService.toResponceDto(dept));
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponceDepartmentDto>{
        const department = await this.departmentService.findOne(id);
        return this.departmentService.toResponceDto(department);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createDepartmentDto: DepartmentCreateDto): Promise<ResponceDepartmentDto>{
        const department = await this.departmentService.create(createDepartmentDto);
        return this.departmentService.toResponceDto(department);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateDepartmentDto: DepartmentUpdateDto
    ): Promise<ResponceDepartmentDto>{
        const department = await this.departmentService.update(id, updateDepartmentDto);
        return this.departmentService.toResponceDto(department);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.departmentService.remove(Number(id));
    }

}
