import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sex } from 'src/entity/sex';
import { SexService } from './sex.service';
import { SexController } from './sex.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Sex])
    ],
    providers: [SexService],
    controllers: [SexController],
})
export class SexModule {}
