import { Module } from '@nestjs/common';
import { BackupController } from './backup.controller';
import { BackupService } from './backup.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ScheduleModule.forRoot(),
    ],
    providers: [BackupService],
    controllers: [BackupController],
})
export class BackupModule {}
