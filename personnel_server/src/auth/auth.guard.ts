import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuards implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      const key = request.headers['api-key'] || request.query.key;

      return key === 'xYH7m$f7egqJysjp$P7f#xF#'
  }
}
