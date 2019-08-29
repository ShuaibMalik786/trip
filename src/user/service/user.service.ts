import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as _ from 'lodash';

@Injectable()
export class UserService {
  errorDetails = { error: '' };

  constructor(@InjectModel('User') private readonly userModel: Model) {}

  //find all user
  async findAll(@Res() res: Response) {
    try {
      const users = await this.userModel
        .find()
        .select('-password')
        .populate('roleId');
      res.status(200).send(users);
    } catch (err) {
      this.handleError(err, res);
    }
  }

  //Create user
  async create(user, @Res() res: Response) {
    try {
      const createdUser = new this.userModel(user);
      let temp = await createdUser.save();
      temp = _.pick(temp, ['_id', 'name', 'email', 'createdAt', 'updatedAt']);
      // temp = await this.userModel.findById(temp._id).select("-password");
      res.status(200).send(temp);
    } catch (err) {
      this.handleError(err, res);
    }
  }

  //update user
  async update(id, user, @Res() res: Response) {
    try {
      const temp = await this.userModel
        .findByIdAndUpdate(id, user, { new: true })
        .select('-password')
        .populate('roleId');
      res.status(200).send(temp);
    } catch (err) {
      this.handleError(err, res);
    }
  }


  //find user
  async findOne(id, @Res() res: Response) {
    try {
      const temp = await this.userModel
        .findById(id)
        .select('-password')
        .populate('roleId');
      res.status(200).send(temp);
    } catch (err) {
      this.handleError(err, res);
    }
  }

    //get user
    async getOne(id) {
      try {
        const temp = await this.userModel
          .findById(id)
          .select('-password')
          .populate('roleId');
       return temp;
      } catch (err) {
        return err;
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
