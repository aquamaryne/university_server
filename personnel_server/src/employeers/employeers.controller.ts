import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmployeersService } from './employeers.service';
import { Employee } from 'src/entity/employees';
import { EmployeeResponceDto } from 'src/dto/employee/responce';
import { CreateEmployeeDto } from 'src/dto/employee/create';
import { UpdateEmployeeDto } from 'src/dto/employee/update';

@Controller('employeers')
export class EmployeersController {
    constructor(private readonly employeerService: EmployeersService) {}

    @Get()
    async findAll(): Promise<EmployeeResponceDto[]>{
        const employees = await this.employeerService.findAll();
        return employees.map(employee => this.employeerService.toResponceDto(employee));
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<EmployeeResponceDto>{
        const employee = await this.employeerService.create(createEmployeeDto);
        return this.employeerService.toResponceDto(employee);
    }

    @Get('search')
    async getSurnames(
        @Query('letter') letter?: string,
        @Query('query') query?: string,
    ): Promise<EmployeeResponceDto[]>{
        try{
            let employees: Employee[] = [];
            if(letter){
                employees = await this.employeerService.findByLetter(letter);
            } else if(query){
                employees = await this.employeerService.findByQuery(query);
            } else {
                employees = await this.employeerService.getAllEmployeers();
            }

            return employees.map(employee => this.employeerService.toResponceDto(employee));
        } catch(error){
            throw new HttpException('Error fetching employees', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('unique/:uniqueCard')
    async findByUniqueCard(@Param('uniqueCard') uniqueCard: string): Promise<EmployeeResponceDto>{
        const employee = await this.employeerService.findByUniqueCard(uniqueCard);
        if(!employee){
            throw new HttpException(`Employee with uniqu card ${uniqueCard} not found`, HttpStatus.NOT_FOUND);

        }
        return this.employeerService.toResponceDto(employee);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<EmployeeResponceDto>{
        const employee = await this.employeerService.findOne(id);
        if(!employee){
            throw new HttpException(`Employee with id ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return this.employeerService.toResponceDto(employee);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateEmployeeDto: UpdateEmployeeDto,
    ): Promise<EmployeeResponceDto>{
        const employee = await this.employeerService.update(id, updateEmployeeDto);
        return this.employeerService.toResponceDto(employee);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }>{
        await this.employeerService.softRemove(id);
        return { message: `Employee with id ${id} removed` };
    }

    @Get('restore/:id')
    async restore(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }>{
        await this.employeerService.restore(id);
        return { message: `Employee with id ${id} restored` };
    }
}
