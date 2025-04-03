import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalInfo } from 'src/entity/personal-info';
import { PersonalInfoService } from './personal_info.service';
import { PersonalInfoController } from './personal_info.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([PersonalInfo])
    ],
    providers: [PersonalInfoService],
    controllers: [PersonalInfoController],
})
export class PersonalInfoModule {}
