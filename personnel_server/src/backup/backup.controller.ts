import { Controller, Get, Post } from '@nestjs/common';
import { BackupService } from './backup.service';

@Controller('backup')
export class BackupController {
    constructor(private readonly backupService: BackupService) {}

    @Post('run')
    async runBackup(){
        try{
            await this.backupService.backupDatabase();
            return { message: 'Backup successfull' };
        } catch(error){
            return { message: 'Error while backup', error};
        }
    }

    @Get('status')
    getStatus(){
        return { message: 'Backup working' };
    } 
}
