import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Default')
@Public()
@Controller()
export class AppController {
  @Get('healthcheck')
  @ApiOperation({
    operationId: 'healthcheck',
    summary: 'Check if summary is running ok',
  })
  getHealthcheck(): string {
    return 'This app is up and running';
  }
}
