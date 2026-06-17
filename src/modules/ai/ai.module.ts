import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiService } from './ai.service';

@Module({
  providers: [AiService, ConfigService],
  exports: [AiService],
})
export class AiModule {}