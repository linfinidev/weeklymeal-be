import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginatedDto } from './common/dtos/api-paginated.dto';
import { GenericApiResponse } from './common/dtos';
import { successResponse } from './common/utils';
import { API_SUCCESS_MSG } from './common/constants/messages';

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
  getHealthcheck(): GenericApiResponse<string> {
    return successResponse(API_SUCCESS_MSG, 'This app is up and running');
  }
}
