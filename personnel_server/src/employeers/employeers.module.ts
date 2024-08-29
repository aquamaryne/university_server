import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employeers } from 'src/entity/employeers';
import { EmployeersService } from './employeers.service';
import { EmployeersController } from './employeers.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Employeers])
    ],
    providers: [EmployeersService],
    controllers: [EmployeersController],
})
export class EmployeersModule {}
