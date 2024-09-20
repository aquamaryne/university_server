import { Controller, Get, HttpStatus, HttpException, Render, Param, Res } from '@nestjs/common';
import { BackupService } from './backup.service';
import { Public } from 'src/api_key/public';
import { Response } from 'express';
import * as path from 'path';
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

    @Get('run')
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
    async getStatus(){
        const lastBackup = await this.getLastBackup();

        return{
            "statusCode": HttpStatus.OK,
            "message": "Backup service is operational",
            lastBackup,
        };
    } 

    @Public()
    @Get('list')
    @Render('backups')
    async getBackupList(){
        try{
            const backups = await this.backupService.getBackupsList();
            return { backups };
        } catch (error) {
            console.error(`Error fetching backup list ${error}`);
            throw new HttpException({
                "statusCode": HttpStatus.INTERNAL_SERVER_ERROR,
                "error": 'Failed to retrieve backup list',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Public()
    @Get('download/:filename')
    async downloadBackup(@Param('filename') filename: string, @Res() res: Response){
        const filePath = path.join(filename);
        res.download(filePath, (err) => {
            if(err){
                console.error(`Error downloading file: ${err}`);
                res.status(404).send('File not found')
            }
        });
    }

    private async getLastBackup(): Promise<{ name: string; date: Date } | string>{
        try{
            const backups = await this.backupService.getBackupsList();
            if(backups.length > 0){
                const lastBackup = backups[backups.length - 1];
                return{
                    name: lastBackup.name,
                    date: lastBackup.date,
                };
            }else {
                return  'No backups found';
            }
        } catch(error){
            return `Error retrieving backups: ${error.message}`;
        }
    }
}
