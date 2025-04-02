import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/entity/employees';
import { EmployeersService } from './employeers.service';
import { EmployeersController } from './employeers.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Employee])
    ],
    providers: [EmployeersService],
    controllers: [EmployeersController],
})
export class EmployeersModule {}
