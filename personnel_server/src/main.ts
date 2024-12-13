import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ApiKeyGuard } from './api_key/api_key.guard';
import { ConfigService } from '@nestjs/config';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const corsOptions: CorsOptions = {
    origin: ['http://172.16.1.35:4000', "http://localhost:3000"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  
  hbs.registerHelper('getStatusClass', (status) => {
    return status === 'up'? 'status-up' : 'status-down';
  });
  
  app.enableCors(corsOptions);
  // app.useGlobalGuards(new ApiKeyGuard(app.get(ConfigService), app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('API Test')
    .setDescription('API для тестирование запросов в приложение "Отдел Кадров"')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(3001);
}
bootstrap();
