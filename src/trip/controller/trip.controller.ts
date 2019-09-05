import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Res, Body, UseGuards, Param, Request, Put, HttpException, HttpStatus, Req, Delete } from '@nestjs/common';
import { TripDto } from '../class-validator/trip';
import { TripService } from '../service/trip.service';

@Controller('api/trip')
@UseGuards(AuthGuard('jwt'))
export class TripController {

    constructor(private readonly tripService: TripService) { }

    @Get()
    findAll() {
        return this.tripService.findAll();
    }

    @Post()
    register(@Body() trip: TripDto) {
        let temp = this.tripService.create(trip)
        return temp;
    }
}
