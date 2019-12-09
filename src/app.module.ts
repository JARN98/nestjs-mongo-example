import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PublicationsModule } from './publications/publications.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:admin123@ds241968.mlab.com:41968/example-nestjs', { useNewUrlParser: true }),
    AuthModule,
    UsersModule,
    PublicationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
