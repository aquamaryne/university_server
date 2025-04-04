import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicStatus } from 'src/entity/academic-status';
import { AcademicStatusController } from './academic-status.controller';
import { AcademicStatusService } from './academic-status.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([AcademicStatus]),
    ],
    controllers: [AcademicStatusController],
    providers: [AcademicStatusService],
})
export class AcademicStatusModule {}
