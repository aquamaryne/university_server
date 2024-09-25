import { Controller, Post, Get, Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvService } from './csv.service';
import { Public } from 'src/api_key/public';

@Controller('csv')
export class CsvController {
    constructor(private readonly csvService: CsvService) {}

    @Public()
    @Get('view')
    @Render('csv')
    getImportPage(){
        return{}
    };

    @Public()
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
