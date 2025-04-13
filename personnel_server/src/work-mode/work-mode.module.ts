import { Module } from '@nestjs/common';
import { WorkModeController } from './work-mode.controller';
import { WorkModeService } from './work-mode.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkMode } from 'src/entity/work-mode';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkMode]),
  ],
  controllers: [WorkModeController],
  providers: [WorkModeService]
})
export class WorkModeModule {}
