import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
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
    return this.appService.loginHandler(loginDTO);
  }

  @Post('user')
  async craeteUser(@Body() createUserDTO: CreateUserDTO) {
    return this.appService.createUser(createUserDTO);
  }

  @Patch('user/password')
  @UseGuards(AuthGuard('jwt'))
  async updatePassword(@Req() req: any, @Body() body: any) {
    return this.appService.changeUserPassword(req.user.user_id, body.password);
  }

  @Get('self')
  @UseGuards(AuthGuard('jwt'))
  async fetchUserSelf(@Req() req: any) {
    return this.appService.findUserById(req.user.user_id);
  }

  @Get('credentials/:credential')
  @UseGuards(AuthGuard('jwt'))
  async fetchUserByCredential(
    @Param('credential') credential: string,
    @Req() req: any,
  ) {
    if (!req.user.service) throw new UnauthorizedException();
    return this.appService.findUserByCredentials(credential);
  }
}
