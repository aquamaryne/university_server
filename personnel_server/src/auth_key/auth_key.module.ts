import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth_Key } from 'src/entity/key';
import { AuthKeyService } from './auth_key.service';
import { AuthKeyController } from './auth_key.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([Auth_Key]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'defaultSecret',
            signOptions: { expiresIn: '1h' }
        })
    ],
    providers: [AuthKeyService],
    controllers: [AuthKeyController],
})
export class AuthKeyModule {}
