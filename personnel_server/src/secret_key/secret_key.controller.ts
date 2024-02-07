import { Controller, Post, Body } from '@nestjs/common';
import { SecretKeyService } from './secret_key.service';

@Controller('auth')
export class SecretKeyController {
    constructor(private readonly keySercice: SecretKeyService){}

    @Post('validate-key')
    async validateKey(@Body('key') body: { keyValue: string } ): Promise<{ isValid: boolean}> {
        const { keyValue } = body;
        const isValid = await this.keySercice.validateKey(keyValue);
        return { isValid };
    } 
}
