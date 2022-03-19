import { Module } from '@nestjs/common';
import { createTypeParserPreset } from 'slonik';
import { SlonikModule } from './slonik';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    SlonikModule.forRoot({
      connectionConfiguration: process.env.PG_CONNECTION_STRING,
      clientUserConfiguration: {
        maximumPoolSize: 60,
        typeParsers: [...createTypeParserPreset()],
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
