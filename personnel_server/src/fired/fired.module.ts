import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fired } from 'src/entity/fired';
import { FiredService } from './fired.service';
import { FiredController } from './fired.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Fired])
    ],
    providers: [FiredService],
    controllers: [FiredController],
})
export class FiredModule {}
