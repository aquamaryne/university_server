import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { FamilyStatusService } from './family_status.service';
import { CreateFamilyStatusDto } from 'src/dto/family-status/create';
import { FamilyStatusResponceDto } from 'src/dto/family-status/responce';
import { UpdateFamilyStatusDto } from 'src/dto/family-status/update';
@Controller('family-status')
export class FamilyStatusController {
    constructor(private readonly familyStatusService: FamilyStatusService) {}

    @Get()
    async findAll(): Promise<FamilyStatusResponceDto[]> {
        const statuses = await this.familyStatusService.findAll();
        return statuses.map(status => this.familyStatusService.toRespondDto(status));
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<FamilyStatusResponceDto> {
        const status = await this.familyStatusService.findOne(id);
        return this.familyStatusService.toRespondDto(status);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createFamilyStatusDto: CreateFamilyStatusDto): Promise<FamilyStatusResponceDto> {
        const status = await this.familyStatusService.create(createFamilyStatusDto);
        return this.familyStatusService.toRespondDto(status);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateFamilyStatusDto: UpdateFamilyStatusDto
    ): Promise<FamilyStatusResponceDto> {
        const status = await this.familyStatusService.update(id, updateFamilyStatusDto);
        return this.familyStatusService.toRespondDto(status);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.familyStatusService.remove(id);
    }

}
