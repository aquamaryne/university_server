import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecretKeyService } from './secret_key.service';
import { SecretKeyController } from './secret_key.controller';
import { A_Key } from '../entity/key';

@Module({
    imports: [TypeOrmModule.forFeature([A_Key])],
    controllers: [SecretKeyController],
    providers: [SecretKeyService],
})
export class SecretKeyModule {}
