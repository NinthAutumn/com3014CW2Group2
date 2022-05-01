import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async health() {
    return true;
  }

  @Post('send/auth/verify')
  @UseGuards(AuthGuard('jwt'))
  async fetchUserByCredential(@Req() req: any, @Body() body: any) {
    console.log(req.user);
    if (!req.user.service) throw new UnauthorizedException();
    return this.appService.sendVerifyEmail(body);
  }
}
