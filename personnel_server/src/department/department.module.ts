import { Module } from '@nestjs/common';
import { Department } from 'src/entity/department';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([Department])
    ],
    providers: [DepartmentService],
    controllers: [DepartmentController],
})
export class DepartmentModule {}
