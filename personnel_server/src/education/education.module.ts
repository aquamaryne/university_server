import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from 'src/entity/education';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Education])
    ],
    providers: [EducationService],
    controllers: [EducationController],
})
export class EducationModule {}
