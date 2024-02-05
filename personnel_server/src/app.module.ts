import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecretKeyModule } from './secret_key/secret_key.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'toor',
        database: 'test_key',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true
    }),
    SecretKeyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
