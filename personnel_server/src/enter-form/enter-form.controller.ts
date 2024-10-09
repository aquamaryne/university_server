import { Controller, Get, Render } from '@nestjs/common';
import { Public } from 'src/api_key/public';

@Controller('enter-form')
export class EnterFormController {
    @Get()
    @Public()
    @Render('form')
    apiKeyForm(){
        return {};
    }
}
