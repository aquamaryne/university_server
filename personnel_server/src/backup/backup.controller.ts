import { Controller, Get, Post, HttpStatus, HttpException, Render } from '@nestjs/common';
import { BackupService } from './backup.service';

@Controller('backups')
export class BackupController {
    constructor(private readonly backupService: BackupService) {}

    @Get()
    async getBackups(){
        try{
            const backups = await this.backupService.getBackupsList();
            return backups;
        } catch(error) {
            throw new HttpException({
                "status": HttpStatus.NOT_FOUND,
                "error": 'Backups not found',
            }, HttpStatus.NOT_FOUND)
        }
    }

    @Post('run')
    async runBackup(){
        try{
            await this.backupService.backupDatabase();
            return {
                "statusCode": HttpStatus.OK, 
                "message": 'Backup successfull' 
            };
        } catch(error){
            console.error('Error during backup', error);
            throw new HttpException({
                "statusCode": HttpStatus.INTERNAL_SERVER_ERROR,
                "message": 'Error while creating backup',
                "error": error.message,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('status')
    getStatus(){
        return {
            "statusCode": HttpStatus.OK, 
            "message": 'Backup working', 
        };
    } 

    @Get('list')
    @Render('backups')
    async getBackupList(){
        const backups = await this.backupService.getBackupsList();
        return { backups };
    }
}
