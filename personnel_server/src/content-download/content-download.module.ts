import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ContentDownloadController } from './content-download.controller';
import { ContentDownloadService } from './content-download.service';

@Module({
    imports: [HttpModule],
    controllers: [ContentDownloadController],
    providers: [ContentDownloadService]
})
export class ContentDownloadModule {}
