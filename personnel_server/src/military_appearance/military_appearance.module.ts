import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Military_Appearance } from 'src/entity/militaryAppearance';
import { MilitaryAppearanceService } from './military_appearance.service';
import { MilitaryAppearanceController } from './military_appearance.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Military_Appearance])
    ],
    providers: [MilitaryAppearanceService],
    controllers: [MilitaryAppearanceController],
})
export class MilitaryAppearanceModule {}
