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
import { MatchDTO } from './dto/match.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async health() {
    return true;
  }

  @Post('/') 
  @UseGuards(AuthGuard('jwt'))
  async createMatch(@Req() req: any, @Body() body: MatchDTO){
    body.userId = req.user.user_id;
    return this.appService.createMatch(body);
  }


  //write routes here
  
}
