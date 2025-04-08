import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportData } from 'src/entity/passport-data';
import { PassportDataService } from './passport-data.service';
import { PassportDataController } from './passport-data.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([PassportData]),
    ],
    providers: [PassportDataService],
    controllers: [PassportDataController],
})
export class PassportDataModule {}
