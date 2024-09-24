import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvService } from './csv.service';
import { Public } from 'src/api_key/public';

@Controller('csv')
export class CsvController {
    constructor(private readonly csvService: CsvService) {}

    @Public()
    @Post('import')
    @UseInterceptors(FileInterceptor('file'))
    async importCsv(@UploadedFile() file: Express.Multer.File){
        await this.csvService.importCsv(file.path);
        return { message: 'Data import success! '};
    }
}
