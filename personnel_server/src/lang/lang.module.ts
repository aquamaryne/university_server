import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeLanguage } from 'src/entity/lang';
import { LangService } from './lang.service';
import { LangController } from './lang.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmployeeLanguage])
    ],
    providers: [LangService],
    controllers: [LangController],
})
export class LangModule {}
