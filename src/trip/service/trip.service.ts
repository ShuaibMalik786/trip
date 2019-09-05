import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as _ from 'lodash';

@Injectable()
export class TripService {
    constructor(@InjectModel('Trip') private readonly tripModel: Model) { }

    // Create trip
    async findAll() {
        return await this.tripModel.find();
    }

    // Create trip
    async create(trip) {
        const createdRole = new this.tripModel(trip);
        return await createdRole.save();;
    }
}
