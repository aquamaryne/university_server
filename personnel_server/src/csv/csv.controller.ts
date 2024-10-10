import { Controller, Post, Get, Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvService } from './csv.service';

@Controller('csv')
export class CsvController {
    constructor(private readonly csvService: CsvService) {}

    @Get('view')
    @Render('csv')
    getImportPage(){
        return{}
    };

    @Post('import')
    @UseInterceptors(FileInterceptor('file'))
    @Render('csv')
    async importCsv(@UploadedFile() file: Express.Multer.File){
        try{
            await this.csvService.importCsv(file.path);
            return { message: 'Data import success! '};
        } catch(error){
            return { 'errorMessage': 'Data import failed'}
        }
    }
}
