import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeType } from 'src/entity/employee-type';
import { EmployeeTypeService } from './employee-type.service';
import { EmployeeTypeController } from './employee-type.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmployeeType]),
    ],
    providers: [EmployeeTypeService],
    controllers: [EmployeeTypeController],
})
export class EmployeeTypeModule {}
