import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateKeyDto } from 'src/dto/create-key.data';
import { A_Key } from 'src/entity/key';

@Controller('auth')
export class AuthController {
    constructor(private readonly keyService: AuthService) {}

    @Post()
    async create(@Body() createKeyDto: CreateKeyDto): Promise<A_Key>{
        return this.keyService.create(createKeyDto);
    }
}
