import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecretKeyService } from './secret_key.service';
import { SecretKeyController } from './secret_key.controller';
import { Auth_Keys } from './key';

@Module({
    imports: [TypeOrmModule.forFeature([Auth_Keys])],
    controllers: [SecretKeyController],
    providers: [SecretKeyService],
})
export class SecretKeyModule {}
