import { Controller, Get, Post, Patch, Delete, Body, Query, Param, HttpException, HttpStatus, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmployeeTypeService } from './employee-type.service';
import { EmployeeType } from 'src/entity/employee-type';
import { EmployeeTypeResponceDto } from 'src/dto/employee-type/responce';
import { EmployeeTypeStatsDto } from 'src/dto/employee-type/stats';
import { EmployeeTypeUpdateDto } from 'src/dto/employee-type/update';
import { EmployeeTypeCreateDto } from 'src/dto/employee-type/create';
@Controller('employee-type')
export class EmployeeTypeController {
    constructor(private readonly employeeTypeSeervice: EmployeeTypeService){}

    @Get()
    async findAll(): Promise<EmployeeTypeResponceDto[]>{
        const types = await this.employeeTypeSeervice.findAll();
        return types.map(type => this.employeeTypeSeervice.toResponceDto(type));
    }

    @Get('stats')
    async getEmployeeStats(): Promise<EmployeeTypeStatsDto[]>{
        return this.employeeTypeSeervice.getEmployeeTypeStats();
    }

    @Get('search')
    async findTypeName(@Query('name') name: string): Promise<EmployeeTypeResponceDto>{
        try{
            const type = await this.employeeTypeSeervice.findByTypeName(name);
            return this.employeeTypeSeervice.toResponceDto(type);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<EmployeeTypeResponceDto>{
        const type = await this.employeeTypeSeervice.findOne(id);
        return this.employeeTypeSeervice.toResponceDto(type);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createEmployeeTypeDto: EmployeeTypeCreateDto): Promise<EmployeeTypeResponceDto>{
        const type = await this.employeeTypeSeervice.create(createEmployeeTypeDto);
        return this.employeeTypeSeervice.toResponceDto(type);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateEmployeeTypeDto: EmployeeTypeUpdateDto
    ): Promise<EmployeeTypeResponceDto>{
        const type = await this.employeeTypeSeervice.update(id, updateEmployeeTypeDto)
        return this.employeeTypeSeervice.toResponceDto(type);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }>{
        try{
            await this.employeeTypeSeervice.remove(id);
            return { message: `Type of employee with ID ${id} successfully deleted` };
        } catch(error){
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
