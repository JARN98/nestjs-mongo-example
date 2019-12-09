import { Controller, Get, Res, HttpStatus, Param, Body, Post, Req, UseGuards, Put, Delete } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationDto } from './dto/publications.dto';
import { Roles } from '../auth/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guards';
import { response } from 'express';

@Controller('publications')
@UseGuards(RolesGuard)
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) { }

  @UseGuards(AuthGuard())
  @Get(':id')
  async findOne(@Param('id') _id: string, @Res() response) {
    this.publicationsService.findOne(_id).then(publication => response.json(publication)).catch((e) => {
      response.status(HttpStatus.FORBIDDEN).json({ message: e });
    })
  }

  @UseGuards(AuthGuard())
  @Get()
  async findAll(@Res() response) {
    await this.publicationsService.findAll().then(publications => response.json(publications)).catch((e) => {
      response.json({ message: e })
    });;
  }

  @Post()
  @UseGuards(AuthGuard())
  @Roles('user')
  async create(@Body() publicationDto: PublicationDto, @Req() request, @Res() response) {
    this.publicationsService.createOne(publicationDto, request.user).then(publication => response.json(publication)).catch((e) => {
      response.json({ message: e })
    });
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  @Roles('user')
  async update(@Body() publicationDto: PublicationDto, @Req() request, @Res() response, @Param('id') _id: string, ) {
    this.publicationsService.updateOne(publicationDto, request.user, _id).then(publication => response.json(publication)).catch((e) => {
      response.json({ message: e })
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @Roles('user')
  async delete(@Param('id') _id: string, @Req() request, @Res() response) {
    this.publicationsService.delete(_id).then(() => response.json({ ok: 'removed ' })).catch(e => response.json({ message: e }));
  }

}
