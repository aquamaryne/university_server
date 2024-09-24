import { Module } from '@nestjs/common';
import { CsvController } from './csv.controller';
import { CsvService } from './csv.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employeers } from 'src/entity/employeers';

@Module({
    imports: [TypeOrmModule.forFeature([Employeers])],
    providers: [CsvService],
    controllers: [CsvController],
})
export class CsvModule {}
