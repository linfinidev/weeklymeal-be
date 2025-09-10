import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';

@Public()
@Controller()
export class AppController {
  @Get('healthcheck')
  getHealthcheck(): string {
    return 'This app is up and running';
  }
}
