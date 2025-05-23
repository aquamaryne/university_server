import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from 'src/entity/location';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
  ],
  controllers: [LocationController],
  providers: [LocationService]
})
export class LocationModule {}
