import { Controller, Post, Body, Render,Get, UnauthorizedException, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthKeyService } from './auth_key.service';
import { Public } from 'src/api_key/public';

@Controller('auth-key')
export class AuthKeyController {
    constructor(
        private readonly authKeyService: AuthKeyService
    ) {}

    @Public()
    @Get()
    @Render('auth-key')
    showForm(){
        return {
            message: null,
        }
    }

    @Public()
    @Get('create')
    @Render('create-key')
    showCreatedForm(){
        return {
            message: null,
        }
    }

    @Public()
    @Post('validate')
    @Render('auth-key')
    async validateAuthKey(
        @Body('auth_key') authKey: string
    ){
        try{
            const authKeyEntity = await this.authKeyService.validateKey(authKey);

            return {
                auth_key: authKeyEntity.auth_key,
                message: 'Login success',
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
                    message: 'An unexpected error occurred',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('add')
    async createAuthKey(
        @Body('auth_key') authKey: string,
    ){
        try{
            await this.authKeyService.createdAuthKey(authKey);
            return {
                message: 'Key successfully added',
            }
        } catch(error) {
            return {
                message: error.message || 'Error while adding key'
            }
        }
    }
}
