import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { User } from './decorator/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async createUser(@User() registerDto: RegisterDto, @Res() response) {
    this.usersService.createUser(registerDto).then(user => response.json(user)).catch((e) => {
      response.status(HttpStatus.FORBIDDEN).json({ message: e });
    })
  }
}
