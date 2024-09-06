import { Module } from '@nestjs/common';
import { BackupController } from './backup.controller';
import { BackupService } from './backup.service';
import { Auth_Key } from 'src/entity/key';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([Auth_Key])
    ],
    providers: [BackupService],
    controllers: [BackupController],
})
export class BackupModule {}
