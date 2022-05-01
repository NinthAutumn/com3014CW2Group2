import { Module } from '@nestjs/common';
import { createTypeParserPreset } from 'slonik';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MorganModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 86400,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    JwtStrategy,
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('dev'),
    },
  ],
})
export class AppModule {}
