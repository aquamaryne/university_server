import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuards } from './auth.guard';

@Controller('auth')
export class AuthController {
    @Get()
    @UseGuards(AuthGuards)
    protectedRoute(){
        return 'Protected';
    }
}
