import {  Response } from 'express';
import { UserService } from '../service/user.service';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Res, Body, UseGuards,Param,Request, Put } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Res() res: Response) {
    this.userService.findAll(res);
  }

  @Get(':id')
  findOne(@Res() res: Response, @Param('id') id) {
    this.userService.findOne(id, res);
  }

  @Post()
  register(@Request() request: Request, @Res() res: Response) {
    this.userService.create(request.body, res);
  }

  // @Put(':id')
  // update(@Req() request: Request, @Res() res: Response, @Param('id') id) {
  //   this.userService.update(id, request.body, res);
  // }
}
