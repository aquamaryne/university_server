import { Controller, Get, Post, Patch, Delete, Body, Query, Param, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { EmployeeTypeService } from './employee-type.service';
import { EmployeeType } from 'src/entity/employee-type';
@Controller('employee-type')
export class EmployeeTypeController {
    constructor(private readonly employeeTypeSeervice: EmployeeTypeService){}

    @Get()
    findAll(): Promise<EmployeeType[]>{
        return this.employeeTypeSeervice.findAll();
    }

    @Get('stats')
    getEmployeeStats(){
        return this.employeeTypeSeervice.getEmployeeTypeStats();
    }

    @Get('search')
    async findTypeName(@Query('name') name: string): Promise<EmployeeType>{
        try{
            return await this.employeeTypeSeervice.findByTypeName(name);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<EmployeeType>{
        return this.employeeTypeSeervice.findOne(id);
    }

    @Post()
    create(@Body('id', ParseIntPipe) id: number): Promise<EmployeeType>{
        return this.employeeTypeSeervice.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() employeeTypeData: Partial<EmployeeType>
    ): Promise<EmployeeType>{
        return this.employeeTypeSeervice.update(id, employeeTypeData);
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
