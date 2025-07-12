import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('healthcheck')
  getHealthcheck(): string {
    return 'This app is up and running';
  }
}
