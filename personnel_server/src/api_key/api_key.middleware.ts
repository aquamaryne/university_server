import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.body['api-key'];
    if(apiKey){
      req.headers['x-api-key'] = apiKey;
    }
    next();
  }
}
