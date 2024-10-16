import { Module } from '@nestjs/common';
import { CsvController } from './csv.controller';
import { CsvService } from './csv.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employeers } from 'src/entity/employeers';
import { Department } from 'src/entity/department';
import { Domains } from 'src/entity/domains';
import { Work_Experience } from 'src/entity/workExperience';
import { Military_Appearance } from 'src/entity/militaryAppearance';
import { Family } from 'src/entity/family';
import { FamilyStatus } from 'src/entity/familyStatus';
import { Positions } from 'src/entity/positions';
import { Personal_Info } from 'src/entity/personalInfo';
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
            Military_Appearance,
            Department,
            Positions,
            Domains,
            Personal_Info,
            FamilyStatus,
            Sex,
            Work_Experience,
    ])],
    providers: [CsvService],
    controllers: [CsvController],
})
export class CsvModule {}
