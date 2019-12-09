import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && compareSync(pass, user.pass)) {
      const { pass, ...result } = user;
      return result;
    }
    return null;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, sub: user._id, roles: user.roles };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}