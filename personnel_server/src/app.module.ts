import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
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
import { BackupController } from './backup/backup.controller';
import { BackupService } from './backup/backup.service';
import { Auth_Key } from './entity/key';
import { AchieveModule } from './achieve/achieve.module';
import { AuthKeyModule } from './auth_key/auth_key.module';
import { DepartmentModule } from './department/department.module';
import { DomainsModule } from './domains/domains.module';
import { EducationModule } from './education/education.module';
import { EmployeersModule } from './employeers/employeers.module';
import { FamilyModule } from './family/family.module';
import { FamilyStatusModule } from './family_status/family_status.module';
import { FiredModule } from './fired/fired.module';
import { LangModule } from './lang/lang.module';
import { MilitaryAppearanceModule } from './military_appearance/military_appearance.module';
import { PersonalInfoModule } from './personal_info/personal_info.module';
import { SexModule } from './sex/sex.module';
import { WorkExperienceModule } from './work_experience/work_experience.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
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
        Auth_Key,
      ],
      synchronize: true,
      logging: true,
    }),
    ScheduleModule.forRoot(),
    AchieveModule,
    AuthKeyModule,
    DepartmentModule,
    DomainsModule,
    EducationModule,
    EmployeersModule,
    FamilyModule,
    FamilyStatusModule,
    FiredModule,
    LangModule,
    MilitaryAppearanceModule,
    PersonalInfoModule,
    SexModule,
    WorkExperienceModule,
  ],
  controllers: [BackupController],
  providers: [BackupService],
})
export class AppModule {}
