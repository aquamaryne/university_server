import { Module } from '@nestjs/common';
import { ContentDownloadController } from './content-download.controller';

@Module({
    controllers: [ContentDownloadController]
})
export class ContentDownloadModule {}
