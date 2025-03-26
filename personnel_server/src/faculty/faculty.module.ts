import { Module } from '@nestjs/common';
import { Faculty } from 'src/entity/faculty';
import { FacultyService } from './faculty.service';
import { FacultyController } from './faculty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([Faculty])
    ],
    providers: [FacultyService],
    controllers: [FacultyController],
})
export class FacultyModule {}
