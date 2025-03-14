import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { Achieve } from './entity/achieve';
import { Personal_Info } from './entity/personalInfo';
import { Department } from './entity/department';
import { Domains } from './entity/domains';
import { Fired } from './entity/fired';
import { Language } from './entity/lang';
import { Employeers } from './entity/employeers';
import { Sex } from './entity/sex';
import { Work_Experience } from './entity/workExperience';
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
import { PersonalInfoModule } from './personal_info/personal_info.module';
import { SexModule } from './sex/sex.module';
import { WorkExperienceModule } from './work_experience/work_experience.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackupModule } from './backup/backup.module';
import { ApiKeyGuard } from './api_key/api_key.guard';
import { PositionsModule } from './positions/positions.module';
import { CsvModule } from './csv/csv.module';
import { HealthModule } from './health/health.module';
import { EnterFormController } from './enter-form/enter-form.controller';
import { ApiKeyMiddleware } from './api_key/api_key.middleware';
import { ExcelModule } from './excel/excel.module';
import { ContentDownloadModule } from './content-download/content-download.module';
import { Staff } from './entity/staff';
import { StaffModule } from './staff/staff.module';
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
        Department,
        Positions,
        Domains,
        Personal_Info,
        FamilyStatus,
        Sex,
        Work_Experience,
        Auth_Key,
        Staff
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
    DepartmentModule,
    DomainsModule,
    EducationModule,
    EmployeersModule,
    FamilyModule,
    FamilyStatusModule,
    FiredModule,
    LangModule,
    PersonalInfoModule,
    SexModule,
    WorkExperienceModule,
    AppModule,
    BackupModule,
    PositionsModule,
    CsvModule,
    HealthModule,
    ExcelModule,
    ContentDownloadModule,
    StaffModule,
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
