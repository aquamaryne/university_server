import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from 'src/dto/staff/create';
import { UpdateStaffDto } from 'src/dto/staff/update';
import { StaffResponceDto } from 'src/dto/staff/responce';
@Controller('staff')
export class StaffController {
    constructor(private readonly staffService: StaffService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findall(): Promise<StaffResponceDto[]>{
        return this.staffService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: number): Promise<StaffResponceDto>{
        return this.staffService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createStaffDto: CreateStaffDto): Promise<StaffResponceDto>{
        return this.staffService.create(createStaffDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id') id: number, 
        @Body() updateStaffDto: UpdateStaffDto
    ): Promise<StaffResponceDto>{
        return this.staffService.update(id, updateStaffDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: number): Promise<void>{
        return this.staffService.remove(id);
    }
}
