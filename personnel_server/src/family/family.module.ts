import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from 'src/entity/family';
import { FamilyService } from './family.service';
import { FamilyController } from './family.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Family])
    ],
    providers: [FamilyService],
    controllers: [FamilyController],
})
export class FamilyModule {}
