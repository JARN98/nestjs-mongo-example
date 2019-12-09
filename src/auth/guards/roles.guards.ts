import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { decode } from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    let token;
    let hasRole;
    try {

      token = request.headers.authorization.split(" ")[1];
      hasRole = () => decode(token)["roles"].some((role) => roles.includes(role));
      return decode(token)["roles"] && hasRole();

    } catch (e) { return false; }
  }
}