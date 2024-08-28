import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthKeyService } from './auth_key.service';
import { Auth_Key } from 'src/entity/key';

@Controller('auth-key')
export class AuthKeyController {
    constructor(private readonly authKeyService: AuthKeyService) {}

    @Post()
    async create(@Body('auth_key') authKey: string): Promise<Auth_Key>{
        return this.authKeyService.create(authKey);
    }

    @Post('validate')
    async validate(@Body('auth_key') authKey: string): Promise<{ exists: boolean }>{
        const exists = await this.authKeyService.validateAuthKey(authKey);
        return { exists };
    }
}
