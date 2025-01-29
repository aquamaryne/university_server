import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ContentDownloadService } from './content-download.service';
@Controller('content-download')
export class ContentDownloadController {
    constructor(private readonly contentDownloadService: ContentDownloadService) {}

    @Get()
    async downloadContent(@Res() res: Response) {
        try{
            const filePath = await this.contentDownloadService.generatePdf();
            res.download(filePath, 'зміст.pdf', (err) => {
                if(err){
                    console.error('Помилка при завантаженні PDF: ', err);
                    res.status(500).send('Помилка при завантаженні PDF');
                }
            });
        } catch (error){ 
            console.error('❌ Помилка при генерації PDF: ', error);
            res.status(500).send('Помилка при генерації PDF');
        }
    }
}
