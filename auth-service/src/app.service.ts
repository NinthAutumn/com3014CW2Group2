import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
import axios from 'axios';
import { config } from 'dotenv';
import { CreateUserDTO } from './dto/creat-user.dto';
config();
@Injectable()
export class AppService {
  userService: any = null;
  constructor(private readonly jwtService: JwtService) {
    this.userService = axios.create({
      baseURL: process.env.USER_SERVICE_URL,
    });
  }

  async logIn(loginDTO: LoginDTO) {
    const { credential, password, cart } = loginDTO;
    // const user = await this.usersService.findUserByCredential(credential);
    // await this.usersService.verifyPassword(password, user.password)

    const { data: user } = await this.userService.post(`/login`, loginDTO);

    if (user) {
      // delete user.password;
      return { token: await this.createJWTToken(user), user };
    } else {
      throw new ForbiddenException();
    }
  }

  async registerHandler(createUserDTO: CreateUserDTO) {
    const { data: user } = await this.userService.post(`/user`, createUserDTO);
    if (user) {
      // delete user.password;
      return { token: await this.createJWTToken(user), user };
    } else {
      throw new ForbiddenException();
    }
  }

  async createJWTToken(payload: any, time: number = 60 * 15) {
    // console.log(process.env.JWT_SECRET);
    return await this.jwtService.sign(payload, {
      expiresIn: time,
    });
  }

  async verifyJWTToken(token: string) {
    return this.jwtService.verify(token);
  }
}
