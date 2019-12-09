import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PublicationSchema from './schema/publication.schema';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Publication', schema: PublicationSchema }]),
  PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [PublicationsService],
  exports: [PublicationsService],
  controllers: [PublicationsController]
})
export class PublicationsModule { }

