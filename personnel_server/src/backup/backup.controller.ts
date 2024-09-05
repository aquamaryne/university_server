import { Controller, Get, Post, HttpStatus, HttpException } from '@nestjs/common';
import { BackupService } from './backup.service';

@Controller('backup')
export class BackupController {
    constructor(private readonly backupService: BackupService) {}

    @Post('run')
    async runBackup(){
        try{
            await this.backupService.backupDatabase();
            return {
                statusCode: HttpStatus.OK, 
                message: 'Backup successfull' 
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
}
