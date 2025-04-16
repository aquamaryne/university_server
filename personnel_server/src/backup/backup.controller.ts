import { Controller, Get, HttpStatus, HttpException, Render, Param, Res, UseGuards } from '@nestjs/common';
import { BackupService } from './backup.service';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { ApiKeyGuard } from 'src/api_key/api_key.guard';
@Controller('backups')
export class BackupController {
    private readonly archieveDir: string;
    constructor(private readonly backupService: BackupService) {
        this.archieveDir = process.env.ARCHIEVE_DIR || '/tmp/backups';
    }

    @Get()
    async getBackups(){
        try{
            const backups = await this.backupService.getBackupsList();
            return {
                statusCode: HttpStatus.OK,
                data: backups,
            };
        } catch(error) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND, 
                message: 'No backups found',
                error: error.message,
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
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error while creating backup',
                error: error.message,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('status')
    async getStatus(){
        try{
            const lastBackup = await this.getLastBackup();
    
            return{
                statusCode: HttpStatus.OK,
                message: "Backup service is operational",
                lastBackup,
            };
        } catch(error){
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error while checking backup status',
                error: error.message,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } 
    
    @UseGuards(ApiKeyGuard)
    @Get('list')
    @Render('backups')
    async getBackupList(){
        try{
            const backups = await this.backupService.getBackupsList();
            return { backups };
        } catch (error) {
            console.error(`Error fetching backup list ${error}`);
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Failed to retrieve backup list',
                message: error.message,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Get('download/:filename')
    async downloadBackup(@Param('filename') filename: string, @Res() res: Response){
        try{
            if(filename.includes('/') || filename.includes('..')){
                return res.status(HttpStatus.BAD_REQUEST).send('Invalid filename');
            }

            const filePath = path.join(this.archieveDir, filename);

            if(!fs.existsSync(filePath)){
                console.error(`File ${filePath} does not exist`);
                return res.status(HttpStatus.NOT_FOUND).send('File not found');
            }

            res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
            res.setHeader('Content-Type', 'application/octet-stream');

            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);

            fileStream.on('error', (err) => {
                console.error(`Error streamin file: ${err}`);
                if(!res.headersSent){
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error streaming file');
                }
            });
        } catch(error){
            console.error(`Error downloading file: ${error}`);
            if(!res.headersSent){
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error processing download request');
            }
        }
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
