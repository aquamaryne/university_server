import { Controller, Get, Render, Res, Post, Body } from '@nestjs/common';
import { Public } from 'src/api_key/public';
import { Response } from 'express';
@Controller('enter-form')
export class EnterFormController {
    @Get()
    @Public()
    @Render('form')
    apiKeyForm(){
        return {};
    }

    @Post('/submit_key')
    submitKey(@Body('apiKey') apiKey: string, @Res() res: Response){
        res.cookie('authKey', apiKey, { httpOnly: true });
        return res.status(200).json({ message: 'API key saved' });
    }

    @Get('/validate_key')
    validateKey(@Res() res: Response){
        const apiKey = res.req.cookies['authKey'];
        if(apiKey){
            return res.status(200).json({ message: 'API deleted' });
        }
        return res.status(401).json({ message: 'API key not found' });
    }
}
