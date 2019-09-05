import { Response } from 'express';
import { UserService } from '../service/user.service';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Res, Body, UseGuards, Param, Request, Put, Req } from '@nestjs/common';
import { UserDto } from '../class-validator/user';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Res() res: Response) {
    this.userService.findAll(res);
  }

  @Post('auth')
  authenticate(@Request() request: Request, @Res() res: Response) {
    this.userService.authenticate(request.body, res);
  }

  @Post()
  register(@Request() request: Request, @Res() res: Response, @Body() user: UserDto) {
    this.userService.create(user, res);
  }

  @Put(':id')
  update(@Req() request: Request, @Res() res: Response, @Param('id') id) {
    this.userService.update(id, request.body, res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Res() res: Response, @Param('id') id) {
    this.userService.findOne(id, res);
  }

}
