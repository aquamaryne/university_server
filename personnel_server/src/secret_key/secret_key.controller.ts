import { Controller, Post, Body } from '@nestjs/common';
import { SecretKeyService } from './secret_key.service';

@Controller('secret-key')
export class SecretKeyController {
    constructor(private readonly secretKey: SecretKeyService){}

    @Post('login')
    async login(@Body('key') key: string): Promise<{ success: boolean; message: string}> {
        try{
            await this.secretKey.validate_key(key);
            return { success: true, message: 'Authorization successful'};
        } catch (error){
            return {success: false, message: error.message};
        }
    } 
}
