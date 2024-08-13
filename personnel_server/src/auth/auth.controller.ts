import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuards } from './auth.guard';

@Controller('protected')
export class AuthController {
    @Get()
    @UseGuards(AuthGuards)
    getProtectedData(){
        return{ data: 'This is protected' }
    }
}
