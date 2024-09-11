import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();

      const apiKey = request.headers['X-API-KEY'] || request.headers['x-api-key'];
      const validateApiKey = this.configService.get<string>('API_KEY');

      console.log(`Reaquest headers ${JSON.stringify(request.headers, null, 2)}`);
      console.log(`Received API key from header: ${apiKey}`);
      console.log(`Expected API key from .env: ${validateApiKey}`);
      console.log(`Type of recieved API key: ${typeof apiKey}`);
      console.log(`Type of expected API key: ${typeof validateApiKey}`);
      console.log(`Loaded API_KEY from env ${process.env.API_KEY}`);

      if(apiKey && apiKey === validateApiKey){
        return true;
      }

      throw new UnauthorizedException('Invalid api key');
  }
}
