import { Module } from '@nestjs/common';
import { createTypeParserPreset } from 'slonik';
import { SlonikModule } from './slonik';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
@Module({
  imports: [
    MorganModule,
    SlonikModule.forRoot({
      connectionConfiguration: process.env.PG_CONNECTION_STRING,
      clientUserConfiguration: {
        maximumPoolSize: 60,
        typeParsers: [...createTypeParserPreset()],
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('dev'),
    },
  ],
})
export class AppModule {}
