import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as _ from 'lodash';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private readonly roleModel: Model) { }

  // Create role
  async create(role, @Res() res: Response) {
    try {
      const createdRole = new this.roleModel(role);
      let temp = await createdRole.save();
      res.status(200).send(temp);
    } catch (err) {
      this.handleError(err, res);
    }
  }

  //find all roles
  async findAll(@Res() res: Response) {
    try {
      const roles = await this.roleModel.find();
      res.status(200).send(roles);
    } catch (err) {
      this.handleError(err, res);
    }
  }


  async deleteRole(id: String) {
    let temp = await this.roleModel.findByIdAndRemove(id);
    return temp;
  }

  async updateRole(id: String, data) {
    let temp = await this.roleModel.findByIdAndUpdate(id, data, { new: true });
    return temp;
  }


  async findOne(id: String) {
    let temp = await this.roleModel.findById(id).populate('components.componentId');;
    return temp;
  }
  // handel error
  handleError(error, @Res() res: Response) {
    let errorDetails = { error: '' };
    if (error.errmsg) {
      errorDetails.error = error.errmsg;
      res.status(400).send(errorDetails);
    }
    if (error.errors) {
      errorDetails.error = error.message;
      res.status(400).send(errorDetails);
    } else {
      res.status(400).send(error);
    }
  }
}
