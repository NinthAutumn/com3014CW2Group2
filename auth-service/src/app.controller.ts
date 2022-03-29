import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { CreateUserDTO } from './dto/creat-user.dto';
import { LoginDTO } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async loginHandler(@Body() loginDTO: LoginDTO) {
    return this.appService.logIn(loginDTO);
  }

  @Post('register')
  async registerHandler(@Body() createUserDTO: CreateUserDTO) {
    return this.appService.registerHandler(createUserDTO);
  }

  @Patch('reset/password')
  @UseGuards(AuthGuard('jwt'))
  async resetPasswordHandler(@Req() req: any, @Body() body: any) {
    return this.appService.resetPasswordHandler(req.user, body.password);
  }
}
