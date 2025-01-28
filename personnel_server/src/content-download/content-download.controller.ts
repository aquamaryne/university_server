import { Controller, Get, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import PDFDocument from "pdfkit";

@Controller('content-download')
export class ContentDownloadController {
    @Get('generate')
    generatePdf(@Res() res: Response, @Body() body: { content: string } ){
        const { content } = body;

        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="зміст.pdf"');

        doc.pipe(res);

        doc.font("Roboto").fontSize(14).text("ЗМІСТ", { align: 'center' });
        doc.font("Roboto").fontSize(12).text(content, { align: 'left' });
        doc.end();
    }
}
