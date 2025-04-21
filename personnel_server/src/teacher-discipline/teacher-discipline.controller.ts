import { Controller, Get, Post, Body, Patch, Delete, ParseIntPipe, Param, Query, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { TeacherDisciplineService } from './teacher-discipline.service';
import { TeacherDiscipline } from 'src/entity/teacher-discipline';
import { CreateTeacherDisciplineDto } from 'src/dto/teacher-discipline/create';
import { UpdateTeacherDisciplineDto } from 'src/dto/teacher-discipline/update';
import { ResponceTeacherDisciplineDto } from 'src/dto/teacher-discipline/responce';
import { DisciplineStatsDto, TopTeacherDto } from 'src/dto/teacher-discipline/stats';
@Controller('teacher-discipline')
export class TeacherDisciplineController {
    constructor(private readonly teacherDisciplineService: TeacherDisciplineService){}

    @Get()
    async findAll(): Promise<ResponceTeacherDisciplineDto[]>{
        const discipline = await this.teacherDisciplineService.findAll();
        return this.teacherDisciplineService.toResponceDtoArray(discipline);
    }

    @Get('status')
    getDisciplineStats(): Promise<DisciplineStatsDto[]>{
        return this.teacherDisciplineService.getDisciplineStats();
    }

    @Get('top-teacher')
    getTopTeacher(@Query('limit', ParseIntPipe) limit?: number): Promise<TopTeacherDto[]>{
        return this.teacherDisciplineService.getTopTeacherrByDisciplineCound(limit);
    }

    @Get('search')
    async findByDisciplineName(@Query('name') name: string): Promise<ResponceTeacherDisciplineDto[]>{
        const discipline = await this.teacherDisciplineService.findByDisciplineName(name);
        return this.teacherDisciplineService.toResponceDtoArray(discipline);
    }

    @Get('employee/:employeeId')
    async findByEmployeeId(@Param('employeeId', ParseIntPipe) employeeId: number): Promise<ResponceTeacherDisciplineDto[]>{
        const discipline = await this.teacherDisciplineService.findByEmployeeId(employeeId);
        return this.teacherDisciplineService.toResponceDtoArray(discipline);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponceTeacherDisciplineDto>{
        const discipline = await this.teacherDisciplineService.findOne(id);
        return this.teacherDisciplineService.toRespoceDto(discipline);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createTeacherDisciplineData: CreateTeacherDisciplineDto): Promise<ResponceTeacherDisciplineDto>{
        const discipline = await this.teacherDisciplineService.create(createTeacherDisciplineData);
        return this.teacherDisciplineService.toRespoceDto(discipline);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTeacherDisciplineData: UpdateTeacherDisciplineDto
    ): Promise<ResponceTeacherDisciplineDto>{
        const discipline = await this.teacherDisciplineService.update(id, updateTeacherDisciplineData);
        return this.teacherDisciplineService.toRespoceDto(discipline);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number ): Promise<{ message: string}>{
        try{
            await this.teacherDisciplineService.remove(id)
            return { message: `Teacher discipline with ID ${id} successfully deleted` }
        } catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

}
