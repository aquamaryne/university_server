import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('/enter-form', 302)
  root(): string {
    return;
  }
}
