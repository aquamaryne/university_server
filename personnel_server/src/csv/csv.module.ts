import { Module } from '@nestjs/common';
import { CsvController } from './csv.controller';
import { CsvService } from './csv.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employeers } from 'src/entity/employees';
import { Faculty } from 'src/entity/faculty';
import { Department } from 'src/entity/department';
import { Work_Experience } from 'src/entity/work-experience';
import { Family } from 'src/entity/family';
import { FamilyStatus } from 'src/entity/family-status';
import { Positions } from 'src/entity/positions';
import { Personal_Info } from 'src/entity/personal-info';
import { Sex } from 'src/entity/sex';
import { Language } from 'src/entity/lang';
import { Fired } from 'src/entity/fired';
import { Achieve } from 'src/entity/achieve';
import { Education } from 'src/entity/education';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([
            Education,
            Achieve,
            Employeers,
            Family,
            Fired, 
            Language,
            Faculty,
            Positions,
            Department,
            Personal_Info,
            FamilyStatus,
            Sex,
            Work_Experience,
    ])],
    providers: [CsvService],
    controllers: [CsvController],
})
export class CsvModule {}
