import { CanActivate, Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly apiKeyMap: Record<string, string>;
  private readonly logger = new Logger(ApiKeyGuard.name);

  constructor(
    private readonly configService: ConfigService,
    private reflector: Reflector
  ) {
    this.apiKeyMap = {
      [this.configService.get<string>('API_KEY_1')]: 'admin',
      [this.configService.get<string>('API_KEY_2')]: 'admin1',
      [this.configService.get<string>('API_KEY_3')]: 'admin2',
      [this.configService.get<string>('API_KEY_4')]: 'admin3'
    }
  }

  canActivate(context: ExecutionContext): boolean {
      const request: Request = context.switchToHttp().getRequest();
      const apiKeyFromHeader = this.extractApiKey(request);

      const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
      if (isPublic){
        return true;
      }

      this.logger.log(`Received API key: ${apiKeyFromHeader}`);

      if(!apiKeyFromHeader){
        this.logger.warn('API key is missing');
        throw new UnauthorizedException('API key is required');
      }

      const userRole = this.apiKeyMap[apiKeyFromHeader];
      if(!userRole){
        this.logger.warn(`Invalid API key: ${apiKeyFromHeader}`);
        throw new UnauthorizedException('Invalid API key');
      }

      request['userRole'] = userRole;
      this.logger.log(`Access granted with role: ${userRole}`);

      return true;
  }

  private extractApiKey(request: Request): string | undefined {
    const apiKeyHeader = request.headers['x-api-key'];
    return Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader;
  }
}
