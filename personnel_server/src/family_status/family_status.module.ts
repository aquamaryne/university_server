import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyStatus } from 'src/entity/familyStatus';
import { FamilyStatusService } from './family_status.service';
import { FamilyStatusController } from './family_status.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([FamilyStatus])
    ],
    providers: [FamilyStatusService],
    controllers: [FamilyStatusController],
})
export class FamilyStatusModule {}
