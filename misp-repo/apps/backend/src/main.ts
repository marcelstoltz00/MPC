/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

// apps/backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Explicitly type the app as INestApplication
  const app: INestApplication = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('MISP API')
    .setDescription('Municipal Integrated Service Portal API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // Explicitly type the generated document
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  // Exposes JSON at http://localhost:3001/api-json
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('PORT') || 3001;
  await app.listen(port);
  console.log(`🚀 Backend running on: http://localhost:${port}`);
  console.log(`📚 Swagger Docs available at: http://localhost:${port}/api`);
}
bootstrap();
