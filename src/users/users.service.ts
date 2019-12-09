import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).lean();
  }

  async createUser(registerDto: RegisterDto): Promise<User> {
    const registerModel = new this.userModel(registerDto);
    return registerModel.save();
  }
}