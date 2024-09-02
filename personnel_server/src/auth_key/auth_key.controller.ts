import { Controller, Post, Body, HttpException, HttpStatus, UnauthorizedException, HttpCode } from '@nestjs/common';
import { AuthKeyService } from './auth_key.service';

@Controller('auth-key')
export class AuthKeyController {
    constructor(
        private readonly authKeyService: AuthKeyService
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async validateAuthKey(@Body('auth_key') authKey: string){
        try{
            const authKeyEntity = await this.authKeyService.validateAuthKey(authKey);
    
            return{
                auth_key: authKeyEntity.auth_key,
                message: 'Login successful!',
            };
        } catch(error){
            if(error instanceof UnauthorizedException){
                throw new HttpException(
                    {
                        statusCode: HttpStatus.UNAUTHORIZED,
                        message: error.message,
                    },
                    HttpStatus.UNAUTHORIZED,
                );
            }

            throw new HttpException(
                {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'An unexpected error occured',
                },

                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }
}
