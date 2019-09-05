import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { HttpErrorFilter } from './core/filter/http-error.filter';
import { LoggingInterceptor } from './core/inercepor/logging.interceptor';
import { TripModule } from './trip/trip.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/trip'),
    AuthModule,
    TripModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule { }
