import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }); // Enables CORS

  // Allow DTO auto validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // to be able to read cookies
  app.use(cookieParser());

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('Auto-generated OpenAPI spec')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // Serve Swagger UI
  SwaggerModule.setup('api/docs', app, document);
  // write spec file
  writeFileSync('swagger/openapi-spec.json', JSON.stringify(document, null, 2));

  await app.listen(8080);
}

void (async () => {
  await bootstrap();
})();
