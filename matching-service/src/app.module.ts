import { Module } from "@nestjs/common";
import { createTypeParserPreset } from "slonik";
import { SlonikModule } from "./slonik";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { MorganInterceptor, MorganModule } from "nest-morgan";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
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
      useClass: MorganInterceptor("dev"),
    },
  ],
})
export class AppModule {}