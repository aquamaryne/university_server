import { Controller, Get, Post, Body, Patch, Delete, ParseIntPipe, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { TeacherDisciplineService } from './teacher-discipline.service';
import { TeacherDiscipline } from 'src/entity/teacher-discipline';

@Controller('teacher-discipline')
export class TeacherDisciplineController {
    constructor(private readonly teacherDisciplineService: TeacherDisciplineService){}

    @Get()
    findAll(): Promise<TeacherDiscipline[]>{
        return this.teacherDisciplineService.findAll();
    }

    @Get('status')
    getDisciplineStats(){
        return this.teacherDisciplineService.getDisciplineStats();
    }

    @Get('top-teacher')
    getTopTeacher(@Query('limit', ParseIntPipe) limit?: number): Promise<any[]>{
        return this.teacherDisciplineService.getTopTeacherrByDisciplineCound(limit);
    }

    @Get('search')
    findByDisciplineName(@Query('name') name: string): Promise<TeacherDiscipline[]>{
        return this.teacherDisciplineService.findByDisciplineName(name);
    }

    @Get('employee/:employeeId')
    findByEmployeeId(@Param('employeeId', ParseIntPipe) employeeId: number): Promise<TeacherDiscipline[]>{
        return this.teacherDisciplineService.findByEmployeeId(employeeId);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<TeacherDiscipline>{
        return this.teacherDisciplineService.findOne(id);
    }

    @Post()
    create(@Body() teacherDisciplineData: Partial<TeacherDiscipline>): Promise<TeacherDiscipline>{
        return this.teacherDisciplineService.create(teacherDisciplineData);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() teacherDisciplineData: Partial<TeacherDiscipline>
    ): Promise<TeacherDiscipline>{
        return this.teacherDisciplineService.update(id, teacherDisciplineData);
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
