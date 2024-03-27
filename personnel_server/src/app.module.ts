import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecretKeyModule } from './secret_key/secret_key.module';
import { A_Key } from './entity/key';
import { Achieve } from './entity/achieve';
import { Personal_info } from './entity/personalInfo';
import { Department } from './entity/department';
import { Domains } from './entity/domains';
import { Fired } from './entity/fired';
import { Language } from './entity/lang';
import { Employeers } from './entity/employeers';
import { Sex } from './entity/sex';
import { Work_Experience } from './entity/workExperience';
import { Military_appearance } from './entity/militaryAppearance';
import { Family } from './entity/family';
import { FamilyStatus } from './entity/familyStatus';
import { Education } from './entity/education';
import { Positions } from './entity/positions';
import { EducationController } from './education/education.controller';
import { EducationService } from './education/education.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([Education]),
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'toor',
        database: 'kadry',
        entities: [
          A_Key,
          Achieve,
          Personal_info,
          Department,
          Domains,
          Fired,
          Language,
          Employeers,
          Sex,
          Work_Experience,
          Military_appearance,
          Family,
          FamilyStatus,
          Education,
          Positions
        ],
        synchronize: true
    }),
    SecretKeyModule
  ],
  controllers: [AppController, EducationController],
  providers: [AppService, EducationService],
})
export class AppModule {}
