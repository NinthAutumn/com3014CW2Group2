import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { CreateUserDTO } from './dto/creat-user.dto';
import { LoginDTO } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async loginHandler(@Body() loginDTO: LoginDTO) {
    return this.appService.loginHandler(loginDTO);
  }

  @Post('user')
  async craeteUser(@Body() createUserDTO: CreateUserDTO) {
    return this.appService.createUser(createUserDTO);
  }

  @Get('self')
  @UseGuards(AuthGuard('jwt'))
  async fetchUserSelf(@Req() req: any) {
    return this.appService.findUserById(req.user.id);
  }
}
