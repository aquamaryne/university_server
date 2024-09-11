import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const apiKey = request.headers['x-api-key'] || request.headers['X-API-KEY'];
      const validateApiKey = this.configService.get<string>('API_KEY');

      console.log(`Received API key from header: ${apiKey}`);
      console.log(`Expected API key from .env: ${validateApiKey}`);
      console.log(`Reauest headers`, JSON.stringify(request.headers, null, 2));

      if(apiKey && apiKey === validateApiKey){
        return true;
      }

      throw new UnauthorizedException('Invalid api key');
  }
}
