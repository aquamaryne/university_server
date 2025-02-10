import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';
import PDFDocument = require('pdfkit');

@Injectable()
export class ContentDownloadService {
    constructor(private readonly httpService: HttpService) {}

    async generatePdf(): Promise<string> {
        const downloadDir = path.join(process.env.USERPROFILE || '', 'Downloads');
        const filePath = path.join(downloadDir, 'Зміст.pdf');

        try{
            const response = await lastValueFrom(this.httpService.get('http://localhost:3001/domains'));
            const domains = response.data;
            
            if(!Array.isArray(domains) || domains.length === 0){
                throw new Error('Domains not found');
            };


            const doc = new PDFDocument({ layout: 'landscape', size: 'A4', margins: { top: 50, left: 50, right: 50, bottom: 50 } }); 
            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);
            
            
            const fontPath = path.join(__dirname, '../../fonts/RobotoMono-Variablefont_wght.ttf');
            if(fs.existsSync(fontPath)){
                doc.font(fontPath);
                console.log('Font loaded');
            } else {
                console.error('Font not found');
                doc.font('Helvetica');
            }
            
            doc.fontSize(16).text('Зміст', { align: 'center' }).moveDown(2);

            const maxLineWidth  = doc.page.width - doc.x - 100;
            const fontSize = 8;
            const dotSpacing = '.';

            domains.forEach((domains: any, index: number) => {
                const domain = domains.domain_name;
                const text = `${index + 1}. ${domain}`;

                const textWidth = doc.widthOfString(text, { size: fontSize });

                const dotsCount = Math.floor((maxLineWidth  - textWidth) / doc.widthOfString(dotSpacing, { size: fontSize }));
                const dots = dotSpacing.repeat(dotsCount > 0 ? dotsCount : 0);

                const fullText = `${text}${dots}`;
                doc.fontSize(fontSize).text(fullText, { align: 'left', width: maxLineWidth }).moveDown(0.5);
            });

            doc.end();

            return new Promise((resolve, reject) => {
                stream.on('finish', () => resolve(filePath));
                stream.on('error', reject);
            })

        } catch(error){
            console.error(error);
            throw new Error('Failed to generate PDF');
        }
    } 
}
