import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InferenceClient } from '@huggingface/inference';
import { LLM_MODEL_DEEPSEEK } from '@/common/constants';

@Injectable()
export class AiService {
  private client: InferenceClient;

  constructor(private configService: ConfigService) {
    const hfToken = this.configService.get<string>('HF_TOKEN');
    this.client = new InferenceClient(hfToken);
  }

  async getChatCompletion(prompt: string) {
    return await this.client.chatCompletion({
      model: LLM_MODEL_DEEPSEEK,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    });
  }
}