import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personal_Info } from 'src/entity/personalInfo';
import { PersonalInfoService } from './personal_info.service';
import { PersonalInfoController } from './personal_info.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Personal_Info])
    ],
    providers: [PersonalInfoService],
    controllers: [PersonalInfoController],
})
export class PersonalInfoModule {}
