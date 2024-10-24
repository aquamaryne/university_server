import { Controller, Get, Render, Res, Post, UseGuards, Req } from '@nestjs/common';
import { Response } from 'express';
import { ApiKeyGuard } from 'src/api_key/api_key.guard';
import { Public } from 'src/api_key/public';
@Controller('enter-form')
export class EnterFormController {
    @Get()
    @Public()
    @Render('form')
    apiKeyForm(){
        return {};
    }

    @Post('submit_key')
    @UseGuards(ApiKeyGuard)
    submitKey(@Req() req: Request, @Res() res: Response){
        const userRole = req['userRole'];
        return res.render('submit_key', { userRole });
    }
}
