import { Body, Controller, Get, Post } from '@nestjs/common';
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

  // @Post('reset/request')
  // async
}
