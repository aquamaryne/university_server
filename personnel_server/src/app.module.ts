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
import { Military_Appearance } from './entity/militaryAppearance';
import { Family } from './entity/family';
import { FamilyStatus } from './entity/familyStatus';
import { Education } from './entity/education';
import { Positions } from './entity/positions';
import { EducationController } from './education/education.controller';
import { EducationService } from './education/education.service';
import { AchieveController } from './achieve/achieve.controller';
import { AchieveService } from './achieve/achieve.service';
import { EmployeersController } from './employeers/employeers.controller';
import { EmployeersService } from './employeers/employeers.service';
import { FamilyController } from './family/family.controller';
import { FamilyService } from './family/family.service';
import { FiredController } from './fired/fired.controller';
import { FiredService } from './fired/fired.service';
import { LangController } from './lang/lang.controller';
import { LangService } from './lang/lang.service';
import { MilitaryAppearanceController } from './military_appearance/military_appearance.controller';
import { MilitaryAppearanceService } from './military_appearance/military_appearance.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        Education,
        Achieve,
        Employeers,
        Family,
        Fired, 
        Language,
        Military_Appearance
      ]),
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
          Military_Appearance,
          Family,
          FamilyStatus,
          Education,
          Positions
        ],
        synchronize: true
    }),
    SecretKeyModule
  ],
  controllers: [AppController, EducationController, AchieveController, EmployeersController, FamilyController, FiredController, LangController, MilitaryAppearanceController],
  providers: [AppService, EducationService, AchieveService, EmployeersService, FamilyService, FiredService, LangService, MilitaryAppearanceService],
})
export class AppModule {}
