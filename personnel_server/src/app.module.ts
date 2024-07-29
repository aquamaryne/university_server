import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Achieve } from './entity/achieve';
import { Personal_Info } from './entity/personalInfo';
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
import { DepartmentController } from './department/department.controller';
import { DepartmentService } from './department/department.service';
import { DomainsController } from './domains/domains.controller';
import { DomainsService } from './domains/domains.service';
import { PersonalInfoController } from './personal_info/personal_info.controller';
import { PersonalInfoService } from './personal_info/personal_info.service';
import { FamilyStatusController } from './family_status/family_status.controller';
import { FamilyStatusService } from './family_status/family_status.service';
import { SexController } from './sex/sex.controller';
import { SexService } from './sex/sex.service';
import { WorkExperienceController } from './work_experience/work_experience.controller';
import { WorkExperienceService } from './work_experience/work_experience.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';


@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
      }),
      JwtModule.register({
        secret: 'my-token',
        signOptions: { expiresIn: '1h' },
      }),
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [
          Achieve,
          Personal_Info,
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
          Positions,
        ],
        synchronize: true
      }),
      TypeOrmModule.forFeature([
        Education,
        Achieve,
        Employeers,
        Family,
        Fired, 
        Language,
        Military_Appearance,
        Department,
        Domains,
        Personal_Info,
        FamilyStatus,
        Sex,
        Work_Experience
      ]),
  ],
  controllers: [AppController, EducationController, AchieveController, EmployeersController, FamilyController, FiredController, LangController, MilitaryAppearanceController, DepartmentController, DomainsController, PersonalInfoController, FamilyStatusController, SexController, WorkExperienceController, AuthController],
  providers: [AppService, EducationService, AchieveService, EmployeersService, FamilyService, FiredService, LangService, MilitaryAppearanceService, DepartmentService, DomainsService, PersonalInfoService, FamilyStatusService, SexService, WorkExperienceService, AuthService],
})
export class AppModule {}
