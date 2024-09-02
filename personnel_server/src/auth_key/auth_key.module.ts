import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth_Key } from 'src/entity/key';
import { AuthKeyService } from './auth_key.service';
import { AuthKeyController } from './auth_key.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Auth_Key]),
    ],
    providers: [AuthKeyService],
    controllers: [AuthKeyController],
})
export class AuthKeyModule {}
