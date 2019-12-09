import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Publications } from './interface/publications.interface';
import { Model } from 'mongoose';
import { PublicationDto } from './dto/publications.dto';

@Injectable()
export class PublicationsService {
  constructor(@InjectModel('Publication') private readonly publicationModel: Model<Publications>) { }

  async findOne(_id: string): Promise<Publications | undefined> {
    return this.publicationModel.findOne({ _id }).lean();
  }

  async findAll(): Promise<Publications[]> {
    return await this.publicationModel.find();
  }

  async createOne(publicationDto: PublicationDto, user: any): Promise<Publications> {
    let createModel = new this.publicationModel(publicationDto);
    createModel.username = user.username;
    return createModel.save();
  }

  async updateOne(publicationDto: PublicationDto, user: any, _id: string): Promise<Publications> {
    let updateModel = new this.publicationModel(publicationDto);
    // updateModel.username = user.username;

    const result = await this.publicationModel.findOneAndUpdate({ _id },
      { title: updateModel.title, content: updateModel.content },
      { upsert: true, useFindAndModify: false });

    return result;
  }

  async delete(_id: string): Promise<any> {
    return await this.publicationModel.findOneAndDelete(_id);
  }
}
