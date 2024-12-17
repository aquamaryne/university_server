import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';
import { ConfigModule } from '@nestjs/config';
import { Employeers } from 'src/entity/employeers';

@Module({
    imports: [
        TypeOrmModule.forFeature([Employeers]),
        ConfigModule.forRoot(),
    ],
    providers: [ExcelService],
    controllers: [ExcelController],
})
export class ExcelModule {}
