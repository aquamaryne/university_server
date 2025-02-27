import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StaffService } from './staff.service';
import { Staff } from 'src/entity/staff';

@Controller('positions')
export class StaffController {
    constructor(private readonly staffService: StaffService) {}

    @Get()
    findall(): Promise<Staff[]>{
        return this.staffService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Staff>{
        return this.staffService.findOne(Number(id));
    }

    @Post()
    create(@Body() staff: Staff): Promise<Staff>{
        return this.staffService.create(staff);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() staff: Staff): Promise<Staff>{
        return this.staffService.update(Number(id), staff);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.staffService.remove(Number(id));
    }
}
