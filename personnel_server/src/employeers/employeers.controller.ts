import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { EmployeersService } from './employeers.service';
import { Employee } from 'src/entity/employees';

@Controller('employeers')
export class EmployeersController {
    constructor(private readonly employeerService: EmployeersService) {}

    @Get()
    findAll(): Promise<Employee[]>{
        return this.employeerService.findAll();
    }

    @Post()
    create(@Body() employeer: Employee): Promise<Employee>{
        return this.employeerService.create(employeer);
    }

    @Get('search')
    async getSurnames(
        @Query('letter') letter?: string,
        @Query('query') query?: string,
    ): Promise<Employee[]> {
        console.log(`Received letter: ${letter}, query: ${query}`);

        try {
            if (letter) {
                const results = await this.employeerService.findByLetter(letter);
                console.log(`Found ${results.length} results for letter: ${letter}`);
                return results;
            } else if (query) {
                const results = await this.employeerService.findByQuery(query);
                console.log(`Found ${results.length} results for query: ${query}`);
                return results;
            } else {
                const results = await this.employeerService.getAllEmployeers();
                console.log(`Returning all employeers, total: ${results.length}`);
                return results;
            }
        } catch (error) {
            console.error("Error fetching surnames:", error);
            throw new Error("Unable to fetch surnames");
        }
    }
    
    @Get('unique/:uniqueCard')
    async findByUniqueCard(@Param('uniqueCard') uniqueCard: string): Promise<Employee>{
        return this.employeerService.findByUniqueCard(uniqueCard);
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Employee>{
        return this.employeerService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() employeer: Employee): Promise<Employee>{
        return this.employeerService.update(id, employeer);
    }

    @Delete(':id')
    remove(@Param('id') id: string ): Promise<void>{
        return this.employeerService.softRemove(Number(id));
    }

    @Get('restore/:id')
    async restore(@Param('id', ParseIntPipe) id: number): Promise<void>{
        await this.employeerService.restore(id);
    }

}
