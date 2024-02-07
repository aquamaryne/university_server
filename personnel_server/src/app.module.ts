import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecretKeyModule } from './secret_key/secret_key.module';
import { Auth_Keys } from './secret_key/key';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'toor',
        database: 'kadry',
        entities: [
          Auth_Keys
        ],
        synchronize: true
    }),
    SecretKeyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
