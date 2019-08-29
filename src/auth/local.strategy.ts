import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/service/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as _ from 'lodash';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('User') private readonly userModel: Model) {
    super();
  }

  async validate(user, @Res() res: Response): Promise<any> {
    try {
      const temp = await this.userModel
        .find({ email: user.email })
        .select('-password')
        .populate('roleId');
      if (temp) {
        res.status(404).send(temp);
      } else {
        res.status(200).send(temp);
      }
    } catch (err) {
      this.handleError(err, res);
    }
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
}
