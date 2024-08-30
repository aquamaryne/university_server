import { Controller, Post, Body, BadGatewayException, InternalServerErrorException, BadRequestException, ConflictException } from '@nestjs/common';
import { AuthKeyService } from './auth_key.service';

@Controller('auth-key')
export class AuthKeyController {
    constructor(
        private readonly authKeyService: AuthKeyService
    ) {}

    @Post()
    async create(@Body('auth-key') authKey: string): Promise<{ access_token: string, message: string }>{
        if(!authKey){
            throw new BadRequestException('Auth key is required');
        }

        try{
            const newAuthKey = await this.authKeyService.create(authKey);
            const access_token = this.authKeyService.generateToken(newAuthKey);
            return { access_token, message: 'Auth key created success.' };
        } catch (error){
            console.error('Error in create auth key: ', error);
            if(error instanceof ConflictException){
                throw error;
            }
            throw new InternalServerErrorException('Failed to create auth key');
        }
    }

    @Post('validate')
    async validate(@Body('auth-key') authKey: string): Promise<{ exists: boolean }>{
        try{
            const exists = await this.authKeyService.validateAuthKey(authKey);
            return { exists };
        } catch (error) {
            console.error('Error in validate auth key: ', error);
            throw new InternalServerErrorException('Failed to validate auth key');
        }
    }
}
