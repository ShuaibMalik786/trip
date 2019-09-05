import { AuthGuard } from '@nestjs/passport';
import { LoginReq } from './validation/login';
import { AuthService } from './auth.service';
import { Controller, Get, Post, Request, Response, Res, Body, UseGuards, UseInterceptors, } from '@nestjs/common';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  //   @Get()
  //   getAll(@Req() request: Request, @Res() res: Response) {
  //       this.authService.findAll(res);
  //     }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post()
  async login(@Body() LoginReq: LoginReq) {
    let res = await this.authService.login(LoginReq);
    return res;
  }
}
