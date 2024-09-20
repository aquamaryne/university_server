import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly apiKeyMap: Record<string, string>;

  constructor(
    private readonly configService: ConfigService,
    private reflector: Reflector
  ) {
    this.apiKeyMap = {
      [this.configService.get<string>('API_KEY_1')]: 'admin',
      [this.configService.get<string>('API_KEY_2')]: 'USER2',
      [this.configService.get<string>('API_KEY_3')]: 'user3',
      [this.configService.get<string>('API_KEY_4')]: 'admin1'
    }
  }

  canActivate(context: ExecutionContext): boolean {
      const request: Request = context.switchToHttp().getRequest();
      const apiKeyFromHeader = request.headers['X-API-KEY'] || request.headers['x-api-key'];
      
      const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
      if(isPublic){
        return true;
      };
      
      console.log(`
          Received API key from header: ${apiKeyFromHeader}
          Type of recieved API key: ${typeof apiKeyFromHeader}
      `);
      
      if(!apiKeyFromHeader){
        console.log('API key is missing.');
        throw new UnauthorizedException('API key is missing');
      }

      if(typeof apiKeyFromHeader === 'string' && this.apiKeyMap[apiKeyFromHeader]){
        return true;
      }

      throw new UnauthorizedException('Invalid api key');
  }
}
