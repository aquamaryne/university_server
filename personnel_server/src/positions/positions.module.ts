import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Positions } from 'src/entity/positions';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Positions])
    ],
    providers: [PositionsService],
    controllers: [PositionsController],
})
export class PositionsModule {}
