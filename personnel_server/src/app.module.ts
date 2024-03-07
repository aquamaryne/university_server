import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecretKeyModule } from './secret_key/secret_key.module';
import { A_Key } from './entity/key';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'toor',
        database: 'test_key',
        entities: [
          A_Key
        ],
        synchronize: true
    }),
    SecretKeyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
