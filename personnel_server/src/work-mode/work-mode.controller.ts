import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, Query, HttpException, HttpStatus } from '@nestjs/common';
import { WorkModeService } from './work-mode.service';
import { WorkMode } from 'src/entity/work-mode';

@Controller('work-mode')
export class WorkModeController {
    constructor(private readonly workModeService: WorkModeService){}

    @Get()
    findAll(): Promise<WorkMode[]>{
        return this.workModeService.findAll();
    }

    @Get('stats')
    getWorkModeStats(){
        return this.workModeService.getWorkModeStats();
    }

    @Get('search')
    findByName(@Query('name') name: string): Promise<WorkMode[]>{
        if(!name){
            throw new HttpException(`Parameter name is required`, HttpStatus.BAD_REQUEST);
        }
        return this.workModeService.findByName(name);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<WorkMode>{
        return this.workModeService.findOne(id);
    }

    @Post()
    create(@Body() workModeData: Partial<WorkMode>): Promise<WorkMode>{
        return this.workModeService.create(workModeData);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() workModeData: Partial<WorkMode>
    ): Promise<WorkMode>{
        return this.workModeService.update(id, workModeData);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }>{
        try{
            await this.workModeService.remove(id);
            return { message: `Work mode with ID ${id} is deleted` };
        } catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
