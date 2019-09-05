import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TripController } from './controller/trip.controller';
import { TripService } from './service/trip.service';
import { tripSchema } from './schema/trip';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Trip', schema: tripSchema }
  ])],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
