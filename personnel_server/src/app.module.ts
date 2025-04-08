import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import { APP_GUARD } from '@nestjs/core';
import { DataSource } from 'typeorm';

import { Achieve }                   from  './entity/achieve';
import { PersonalInfo }              from  './entity/personal-info';
import { Faculty }                   from './entity/faculty';
import { Department }                from './entity/department';
import { Fired }                     from './entity/fired';
import { EmployeeLanguage }          from './entity/lang';
import { Employee }                  from './entity/employees';
import { WorkExperience }            from './entity/work-experience';
import { Family }                    from './entity/family';
import { FamilyStatus }              from './entity/family-status';
import { Education }                 from './entity/education';
import { Positions }                 from './entity/positions';
import { BackupController }          from './backup/backup.controller';
import { BackupService }             from './backup/backup.service';
import { Auth_Key }                  from './entity/key';
import { AchieveModule }             from './achieve/achieve.module';
import { AuthKeyModule }             from './auth_key/auth_key.module';
import { FacultyModule }             from './faculty/faculty.module';
import { DepartmentModule }          from './department/department.module';
import { EducationModule }           from './education/education.module';
import { EmployeersModule }          from './employeers/employeers.module';
import { FamilyModule }              from './family/family.module';
import { FamilyStatusModule }        from './family_status/family_status.module';
import { FiredModule }               from './fired/fired.module';
import { LangModule }                from './lang/lang.module';
import { PersonalInfoModule }        from './personal_info/personal_info.module';
import { WorkExperienceModule }      from './work_experience/work_experience.module';
import { ConfigModule }              from '@nestjs/config';
import { AppController }             from './app.controller';
import { AppService }                from './app.service';
import { BackupModule }              from './backup/backup.module';
import { ApiKeyGuard }               from './api_key/api_key.guard';
import { PositionsModule }           from './positions/positions.module';
import { CsvModule }                 from './csv/csv.module';
import { HealthModule }              from './health/health.module';
import { EnterFormController }       from './enter-form/enter-form.controller';
import { ApiKeyMiddleware }          from './api_key/api_key.middleware';
import { ExcelModule }               from './excel/excel.module';
import { ContentDownloadModule }     from './content-download/content-download.module';
import { Staff }                     from './entity/staff';
import { Location }                  from './entity/location';
import { StaffModule }               from './staff/staff.module';
import { UniversityEmployment }      from './entity/university-employment';
import { WorkMode }                  from './entity/work-mode';
import { Vacation }                  from './entity/vacation';
import { TeacherDiscipline }         from './entity/teacher-discipline';
import { PassportData }              from './entity/passport-data';
import { EmployeeAchievement }       from './entity/employee-achivement';
import { AcademicStatus }            from './entity/academic-status';
import { EmployeeType }              from './entity/employee-type';
import { AcademicStatusModule }      from './academic-status/academic-status.module';
import { EmployeeAchievementModule } from './employee-achievement/employee-achievement.module';
import { PassportDataModule }        from './passport-data/passport-data.module';
import { VacationModule }            from './vacation/vacation.module';

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
        Employee,
        Family,
        EmployeeLanguage,
        Faculty,
        Positions,
        Department,
        PersonalInfo,
        FamilyStatus,
        WorkExperience,
        Auth_Key,
        Staff,
        Location,
        UniversityEmployment,
        WorkMode,
        Vacation, 
        TeacherDiscipline, 
        PassportData, 
        Fired,
        EmployeeAchievement,
        AcademicStatus, 
        EmployeeType,
      ],
      synchronize: true,
      logging: true,
      autoLoadEntities: true,      
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   sortSchema: true,
    // }),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    AchieveModule,
    AuthKeyModule,
    FacultyModule,
    DepartmentModule,
    EducationModule,
    EmployeersModule,
    FamilyModule,
    FamilyStatusModule,
    FiredModule,
    LangModule,
    PersonalInfoModule,
    WorkExperienceModule,
    AppModule,
    BackupModule,
    PositionsModule,
    CsvModule,
    HealthModule,
    ExcelModule,
    ContentDownloadModule,
    StaffModule,
    AcademicStatusModule,
    EmployeeAchievementModule,
    VacationModule,
    PassportDataModule,
  ],
  controllers: [AppController, BackupController, EnterFormController ],
  providers: [
    AppService,
    BackupService,
    ApiKeyGuard,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(ApiKeyMiddleware).forRoutes('submit_key');
  }
}
