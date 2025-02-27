import { Controller, Get, Redirect } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Controller()
export class AppController {
  constructor(private configService: ConfigService){}

  @Get('')
  @Redirect('/enter-form', 302)
  root(): string {
    return;
  }

  @Get('')
  getVersion(){
    return { 
      version: this.configService.get<string>('VERSION')
    };
  }
}
