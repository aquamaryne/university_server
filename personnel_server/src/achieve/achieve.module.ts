import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achieve } from 'src/entity/achieve';
import { AchieveService } from './achieve.service';
import { AchieveController } from './achieve.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Achieve])
    ],
    providers: [AchieveService],
    controllers: [AchieveController],
})
export class AchieveModule {}
