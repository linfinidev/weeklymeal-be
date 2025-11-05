import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginatedDto } from './common/dtos/api-paginated.dto';

@ApiTags('Default')
@Public()
@Controller()
@ApiExtraModels(PaginatedDto)
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
