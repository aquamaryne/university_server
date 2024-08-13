import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET, PUT, POST, DELETE, HEAD, PATCH',
    credentials: true,
  };
  app.enableCors(corsOptions);

  const config = new DocumentBuilder()
    .setTitle('API Test')
    .setDescription('API для тестирование запросов в приложение "Отдел Кадров"')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
