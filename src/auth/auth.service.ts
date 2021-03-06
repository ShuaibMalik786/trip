import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from '../user/service/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as _ from 'lodash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model,
  ) { }

  async login(user) {
    // try {
    let temp = await this.userModel
      .findOne({ email: user.email, password: user.password })
      .select('-password')
      .populate('roles');
    console.log(user.email);
    if (!temp || temp.length == 0) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    temp = this.genrateToken(temp);
    return temp;
  }

  // handel error
  handleError(error, @Res() res: Response) {
    let errorDetails = { error: '' };
    if (error.errmsg) {
      errorDetails.error = error.errmsg;
      res.status(400).send(errorDetails);
    } else if (error.message) {
      errorDetails.error = error.message;
      res.status(400).send(errorDetails);
    } else {
      res.status(400).send(error);
    }
  }

  genrateToken(user) {
    const payload = { email: user.email, sub: user._id };
    return {
      user: user,
      access_token: this.jwtService.sign(payload)
    };
  }
}
