import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacation } from 'src/entity/vacation';
import { VacationService } from './vacation.service';
import { VacationController } from './vacation.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Vacation]),
    ],
    providers: [VacationService],
    controllers: [VacationController],
})
export class VacationModule {}
