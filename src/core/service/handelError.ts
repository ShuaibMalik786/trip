import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as _ from 'lodash';

@Injectable()
export class HandelErrorService {
  constructor(@InjectModel('Role') private readonly roleModel: Model) {}

  // handel error
  handleError(error, @Res() res: Response) {
    let errorDetails = { error: '' };
    if (error.errmsg) {
      errorDetails.error = error.errmsg;
      res.status(400).send(errorDetails);
    }
    if (error.errors) {
      errorDetails.error = error.errors.name.message;
      res.status(400).send(errorDetails);
    } else {
      res.status(400).send(error);
    }
  }
}
