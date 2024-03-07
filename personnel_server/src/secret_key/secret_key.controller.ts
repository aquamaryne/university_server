import { Controller, Post, Body } from '@nestjs/common';
import { SecretKeyService } from './secret_key.service';

@Controller('auth')
export class SecretKeyController {
    constructor(private readonly keySercice: SecretKeyService){}

    @Post()
    async validateKey(@Body('key') key: string  ): Promise<{ isValid: boolean}> {
        const isValid = await this.keySercice.validateKey(key);
        return { isValid };
    } 
}
