import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuards extends AuthGuard('jwt') {
    CanActivate(context: ExecutionContext) {
      return super.canActivate(context);
    }
}
